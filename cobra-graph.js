window.createCobraGraph = function createCobraGraph(container) {
  const translate = window.translateSiteText;
  function elements(model) {
    const nodes = model.nodes.map(([id, label, x, y, classes = '']) => ({ data: { id, label }, position: { x, y }, classes }));
    const edges = model.edges.map(([source, target, classes = '']) => ({ data: { id: `${source}-${target}`, source, target }, classes }));
    return [...nodes, ...edges];
  }

  function dependencies() {
    return elements({ nodes: [
      ['action', translate('$action: unknown'), 95, 28, 'unresolved'],
      ['suffix', '"_controller"', 300, 28],
      ['concat', translate('String concatenation'), 200, 112],
      ['stretch', translate('Unresolved result'), 200, 202, 'unresolved'],
      ['call', '$target($engine, $data)', 200, 286]
    ], edges: [['action', 'concat'], ['suffix', 'concat'], ['concat', 'stretch'], ['stretch', 'call', 'unresolved']] });
  }

  function callPaths(context) {
    if (context === 'admin') return elements({ nodes: [
      ['entry', 'controller("admin", 0, …)', 220, 38, 'on-path'],
      ['admin', 'admin_controller', 220, 132, 'on-path'],
      ['none', translate('No candidate path\nto the shown SQL sink'), 220, 250, 'message']
    ], edges: [['entry', 'admin', 'on-path']] });
    return elements({ nodes: [
      ['entry', 'controller("feed", 0, …)', 220, 24, 'on-path'],
      ['feed', 'feed_controller', 220, 106, 'on-path'],
      ['mysql', 'MySqlEngine::\ninsert_feed', 115, 198, 'on-path'],
      ['other', 'OtherSqlEngine::\ninsert_feed', 325, 198, 'on-path'],
      ['sql', translate('SQL sink'), 115, 292, 'on-path'],
      ['candidate', translate('Other sink candidate\n(body omitted)'), 325, 292, 'on-path']
    ], edges: [['entry', 'feed', 'on-path'], ['feed', 'mysql', 'on-path'], ['feed', 'other', 'on-path'], ['mysql', 'sql', 'on-path'], ['other', 'candidate', 'on-path']] });
  }

  function dataFlow(context) {
    if (context === 'admin') return elements({ nodes: [['none', translate('No candidate path\nto this SQL sink'), 220, 160, 'message']], edges: [] });
    return elements({ nodes: [
      ['input', '$_GET["data"]', 220, 24, 'tainted'],
      ['feed', 'feed_controller: $data', 220, 94, 'tainted'],
      ['mysql', 'MySqlEngine: $value', 115, 168, 'tainted'],
      ['other', translate('OtherSqlEngine\nexcluded: engine_id = 0'), 325, 168, 'excluded'],
      ['string', translate('SQL string'), 115, 240, 'tainted'],
      ['sink', 'query(…)', 115, 312, 'tainted']
    ], edges: [['input', 'feed', 'tainted'], ['feed', 'mysql', 'tainted'], ['feed', 'other', 'excluded'], ['mysql', 'string', 'tainted'], ['string', 'sink', 'tainted']] });
  }

  const graph = cytoscape({
    container, elements: [], layout: { name: 'preset' }, autoungrabify: true,
    autounselectify: true, boxSelectionEnabled: false, userZoomingEnabled: false, userPanningEnabled: false,
    style: [
      { selector: 'node', style: { label: 'data(label)', shape: 'round-rectangle', width: 174, height: 42, 'background-color': '#f3f6f9', 'border-width': 1, 'border-color': '#b7c2cf', color: '#263d54', 'font-size': 12, 'font-family': 'system-ui, sans-serif', 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap' } },
      { selector: 'edge', style: { width: 1.5, 'curve-style': 'bezier', 'target-arrow-shape': 'triangle', 'line-color': '#8c9dad', 'target-arrow-color': '#8c9dad' } },
      { selector: 'node.on-path', style: { 'background-color': '#e8eff9', 'border-color': '#002d72', 'border-width': 2 } },
      { selector: 'edge.on-path', style: { 'line-color': '#002d72', 'target-arrow-color': '#002d72', width: 2.5 } },
      { selector: '.inactive', style: { opacity: 0.22 } },
      { selector: 'node.unresolved', style: { 'border-style': 'dashed', 'border-color': '#8a6a2f' } },
      { selector: 'edge.unresolved', style: { 'line-style': 'dashed' } },
      { selector: 'node.tainted', style: { 'background-color': '#fbefef', 'border-color': '#a6192e', 'border-width': 1.5 } },
      { selector: 'edge.tainted', style: { 'line-color': '#a6192e', 'target-arrow-color': '#a6192e', width: 2 } },
      { selector: 'node.excluded', style: { opacity: 0.45, 'border-style': 'dashed' } },
      { selector: 'edge.excluded', style: { opacity: 0.3, 'line-style': 'dashed', 'target-arrow-shape': 'none' } },
      { selector: 'node.message', style: { width: 245, height: 72, 'background-color': '#f3f6f9', 'font-size': 14 } }
    ]
  });

  function fit() {
    if (!graph.elements().length || !container.clientWidth) return;
    graph.resize();
    graph.fit(undefined, 18);
  }

  function showPhase(context, phase) {
    const builders = [dependencies, callPaths, dataFlow];
    graph.elements().remove();
    graph.add(builders[phase](context));
    fit();
  }

  const resizeObserver = new ResizeObserver(fit);
  resizeObserver.observe(container);
  return { showPhase, fit };
};
