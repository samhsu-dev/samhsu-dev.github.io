(() => {
  const translate = window.translateSiteText;
  const phases = [
    {
      heading: translate('Record what the function cannot yet know'),
      graph: translate('Phase I · Dependencies'),
      input: translate('The parsed PHP program, analyzed one function at a time.'),
      method: translate('Use intra-procedural abstract interpretation to record values and their dependencies. Keep parameters and expressions that need calling context as stretch nodes: values whose resolution is deferred. Record both the producing operation and its operands.'),
      output: translate('An abstract domain graph (ADG) that preserves the information needed to revisit unresolved expressions.'),
      example: translate('Inside controller, $action is unknown. CoBrA records that the target depends on $action and the suffix "_controller", rather than guessing a function.')
    },
    {
      heading: translate('Resolve dynamic calls and collect candidate paths'),
      graph: translate('Phase II · Candidate call paths'),
      input: translate('The dependency graph from Phase I and the calling contexts.'),
      method: translate('Use lightweight inter-procedural interpretation to apply argument values and resolve dynamic calls. Context labels keep feed and admin calls distinct. Search for candidate source-to-sink call paths; these paths still require the more detailed checks in Phase III.'),
      output: translate('Candidate paths containing a source, a sink and a sequence of call sites and callees.')
    },
    {
      heading: translate('Refine the branches, then check the input flow'),
      graph: translate('Phase III · Branch refinement and taint flow'),
      input: translate('The candidate paths from Phase II.'),
      method: translate('Use heavyweight inter-procedural abstract interpretation with a fresh scope for each call. Evaluate statements and branch conditions, follow both branches when a condition remains unknown, and propagate taint through operations and sanitizers. Extract source-to-sink data-flow evidence from the resulting graph.'),
      output: translate('Data-flow evidence for reported vulnerabilities; candidate paths without the required flow are excluded.')
    }
  ];
  const contexts = ['feed', 'admin'];
  const contextButtons = Array.from(document.querySelectorAll('[data-context]'));
  const phaseButtons = Array.from(document.querySelectorAll('[data-phase]'));
  const code = document.getElementById('cobra-code');
  const fullCode = document.getElementById('cobra-full-code');
  const outcome = document.getElementById('cobra-result');
  const nextButton = document.getElementById('cobra-next');
  const details = document.getElementById('cobra-demo-details');
  let graph = null;
  let context = 'feed';
  let phase = 0;

  const program = [
      'function controller($action, $engine_id, $data) {',
      '  $engine = get_engine($engine_id);',
      '  $target = $action . "_controller";',
      '  $target($engine, $data);',
      '}',
      'function get_engine($id) {',
      '  switch ($id) {',
      '    case 0: return new MySqlEngine;',
      '    case 1: return new OtherSqlEngine;',
      '  }',
      '}',
      'function feed_controller($engine, $data) {',
      '  $engine->insert_feed($data);',
      '}',
      'class MySqlEngine {',
      '  function insert_feed($value) {',
      '    global $db;',
      '    $sql = "INSERT INTO feed(v) VALUES ($value)";',
      '    $db->query($sql);',
      '  }',
      '}',
      'class OtherSqlEngine {',
      '  function insert_feed($value) { /* candidate sink omitted */ }',
      '}',
      'function admin_controller($engine, $data) { /* ... */ }',
      ''
  ];

  function programLines() {
    return [...program, `controller("${context}", 0, $_GET["data"]);`];
  }

  function visibleLines() {
    if (phase === 0) return [0, 1, 2, 3, 4];
    if (phase === 1) return context === 'feed' ? [26, -1, 2, 3, -1, 11, 12, 13] : [26, -1, 2, 3, -1, 24];
    return context === 'feed' ? [26, -1, 5, 6, 7, 8, 9, 10, -1, 17, 18] : [26, -1, 24];
  }

  function highlightedLines() {
    if (phase === 0) return [2, 3];
    if (phase === 1) return [26, 2, 3, 12, 24];
    return context === 'feed' ? [26, 7, 17, 18] : [26, 24];
  }

  function renderCode() {
    const program = programLines();
    const highlighted = highlightedLines();
    const lines = visibleLines().map(index => {
      const line = document.createElement('span');
      line.className = 'demo-code-line';
      line.classList.toggle('dynamic-target', highlighted.includes(index));
      line.textContent = index < 0 ? '// …' : program[index];
      return line;
    });
    code.replaceChildren(...lines);
    fullCode.textContent = program.join('\n');
  }

  function resultText() {
    if (phase === 0) return phases[0].example;
    if (phase === 2 && context === 'admin') return translate('The admin call has no candidate path to this SQL sink, so there is no such path to check in Phase III.');
    if (phase === 2) return translate('get_engine(0) selects MySqlEngine. The OtherSqlEngine candidate is excluded; on the remaining path, request data enters the SQL string and reaches query.');
    if (context === 'feed') return translate('"feed" resolves the dynamic target to feed_controller. At this stage, both engine paths are candidates; Phase III will check which branch applies and whether input reaches the SQL sink.');
    return translate('"admin" resolves the target to admin_controller. Keeping this context distinct avoids adding the feed call’s SQL paths to the admin call.');
  }

  function targetText() {
    if (phase === 0) return translate('$action . "_controller" → unresolved target');
    if (phase === 2) return context === 'feed' ? '$engine_id = 0 → MySqlEngine' : translate('No candidate SQL path');
    return `$action = "${context}" → ${context}_controller`;
  }

  function render() {
    for (const button of contextButtons) button.setAttribute('aria-pressed', String(button.dataset.context === context));
    for (const button of phaseButtons) button.setAttribute('aria-pressed', String(Number(button.dataset.phase) === phase));
    renderCode();
    if (graph) graph.showPhase(context, phase);
    document.getElementById('target-label').textContent = targetText();
    document.getElementById('graph-label').textContent = phases[phase].graph;
    document.getElementById('phase-heading').textContent = phases[phase].heading;
    for (const field of ['input', 'method', 'output']) document.getElementById(`phase-${field}`).textContent = phases[phase][field];
    outcome.textContent = resultText();
    nextButton.textContent = phase === phases.length - 1 ? translate('Start again ↻') : translate('Next: Phase {phase} →').replace('{phase}', phase === 0 ? 'II' : 'III');
  }

  function selectContext(event) {
    context = event.currentTarget.dataset.context;
    if (!contexts.includes(context)) throw new Error('Unknown example context');
    render();
  }

  function selectPhase(event) {
    phase = Number(event.currentTarget.dataset.phase);
    if (!Number.isInteger(phase) || phase < 0 || phase >= phases.length) throw new Error('Unknown analysis phase');
    render();
  }

  details.addEventListener('toggle', () => {
    if (!details.open) return;
    requestAnimationFrame(() => {
      if (!graph) graph = createCobraGraph(document.getElementById('cobra-graph'));
      graph.fit();
      render();
    });
  });
  for (const button of contextButtons) button.addEventListener('click', selectContext);
  for (const button of phaseButtons) button.addEventListener('click', selectPhase);
  nextButton.addEventListener('click', () => { phase = (phase + 1) % phases.length; render(); });
  render();
})();
