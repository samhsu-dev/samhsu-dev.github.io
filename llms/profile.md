# Research and selected work

> Research interests and selected public work of Yichao Xu.

## Profile

- Name: Yichao Xu.
- Position: Computer Science PhD candidate at Johns Hopkins University; expected Dec 2027. Advisor: Yinzhi Cao.
- Research focus: developing tools for software vulnerability discovery; AI-assisted security analysis; security risks in agentic systems.
- Program analysis includes static analysis and fuzzing. Yichao designed and built the Kotlin CoBrA analyzer, and implemented JavaScript abstract interpretation and led the evaluation of FAST.
- Agentic security includes using AI agents to support security analysis and studying security issues in agentic systems.

## Publications

- Discovery or Memorization? A Faithful Benchmark for Real-World Business-Logic Vulnerability Discovery. Rui Yang, Yichao Xu, Zhuohao Zhang, Jiahao Ji, Chaowei Xiao, Yinzhi Cao, Ziyang Li. arXiv 2026; 2026; preprint. Paper: https://arxiv.org/abs/2610.17542. PDF: https://arxiv.org/pdf/2610.17542.
- CoBrA: Context-, Branch-sensitive Static Analysis for Detecting Taint-style Vulnerabilities in PHP Web Applications. Yichao Xu, Mingqing Kang, Neil Thimmaiah, Rigel Gjomemo, V. N. Venkatakrishnan, Yinzhi Cao. ICSE 2026; 2026; published. Paper: https://dl.acm.org/doi/10.1145/3744916.3773195.
- Same Request, Different Boundary: Evaluating Cybersecurity Assistance across Conversational Contexts. Rui Yang, Yang Hong, Yichao Xu, Zhengyu Liu, Yinzhi Cao, Ziyang Li. arXiv 2026; 2026; preprint. Paper: https://arxiv.org/abs/2609.00578. PDF: https://arxiv.org/pdf/2609.00578.
- Scaling JavaScript Abstract Interpretation to Detect and Exploit Node.js Taint-style Vulnerability. Mingqing Kang, Yichao Xu, Song Li, Rigel Gjomemo, Jianwei Hou, V. N. Venkatakrishnan, Yinzhi Cao. IEEE S&P 2023; 2023; published. Paper: https://ieeexplore.ieee.org/document/10179352.

- A Denial of Services Attack for IOT System. Science and Wealth; Jun 2018; ISSN 1671-2226.

## Software

- Harvest Claude: Rust terminal application that visualizes running Claude Code agents as pixel-art characters in a farm scene. Repository: https://github.com/samhsu-dev/harvest-claude.
- Joern: Upstream contributor of a PHP version-check fix, queries for five vulnerability classes and regression tests. PR #5327 merged on February 28, 2025: https://github.com/joernio/joern/pull/5327.
- cpg2py: Python library for loading Joern code property graphs and querying code and data-flow relationships. Repository: https://github.com/samhsu-dev/cpg2py.
- ripsv0.5-cli: Command-line adaptation of the legacy RIPS v0.5 PHP analyzer, with command-line options and JSON reporting. Repository: https://github.com/samhsu-dev/ripsv0.5-cli.

## Experience

- Jay-I-break team (Johns Hopkins University), 2026 Amazon Nova AI Challenge: Core Engineer, Feb 2026–Present. Maintained 8 agentic pipelines for software vulnerability discovery. Developed 1 black-box analysis pipeline and 2 dynamic analysis pipelines. Competition participation, not Amazon employment.
- Johns Hopkins University, SecLab: Research Assistant, Sep 2021–Present. Static analysis and fuzzing for software vulnerability discovery.
- Johns Hopkins University, S4 Lab: Research Assistant internship, Sep 2022–2023. C++ simulation of vehicular-network denial-of-service attacks and defenses in OMNeT++.
- China Academy of Industrial Internet: Research Assistant internship, Dec 2020–Mar 2021, Beijing, China. Hyperledger Fabric framework for product traceability and access control.
- University College London: Research Assistant, Jun–Sep 2020. Python tool linking tests and source methods through Git co-evolution.

## Education

- Johns Hopkins University: PhD, Computer Science, Jan 2023–Present; expected Dec 2027. Advisor: Yinzhi Cao.
- Johns Hopkins University: MS, Security Informatics, Sep 2021–Dec 2022.
- University College London: MSc, Software Systems Engineering, Sep 2019–Oct 2020; Distinction.
- University of Liverpool and Xi’an Jiaotong-Liverpool University: BSc (Honours), Information and Computing Science, 2015–2019; 2+2 joint programme; First Class Honours.

## Teaching

- Language-Based Security: Teaching Assistant, Johns Hopkins University; 2025; instructor: Yinzhi Cao.
- Practical Cryptographic Systems: Teaching Assistant, Johns Hopkins University; 2023; instructor: Matthew Green.
- Future Networks: Course Assistant, Johns Hopkins University; 2022; instructor: Krishan Sabnani.

## Honors

- Outstanding Achievement, BOSCH CHINA IoT TECH HACKATHON, Jul 2018.

## Interactive example

- The CoBrA publication includes a collapsed, predefined illustration adapted from its Emoncms example.
- Phase I, Dependency Generation: intra-procedural abstract interpretation records local dependencies and defers context-dependent values as stretch nodes in the ADG.
- Phase II, Call Paths Generation: lightweight inter-procedural interpretation applies calling contexts, resolves dynamic calls and generates candidate source-to-sink call paths.
- Phase III, Vulnerabilities Detection: more detailed inter-procedural interpretation and data-flow extraction check whether untrusted values reach sinks on candidate paths.
- Visitors switch between feed and admin calling contexts and inspect dependencies, candidate calls and data-flow evidence.
- The reduced example includes get_engine(0): Phase II retains candidate paths through two engine implementations; Phase III selects MySqlEngine and excludes the OtherSqlEngine path before showing the surviving taint flow. Parsing, database setup and the other engine body are omitted.
- The illustration does not execute PHP, SQL or CoBrA.

## Links

- Website (English): https://samhsu-dev.github.io/
- Website (Chinese): https://samhsu-dev.github.io/index-zh.html
- CV reading and print page (English): ../cv.html
- CV reading and print page (Chinese): ../cv-zh.html

- Google Scholar: https://scholar.google.com/citations?user=I8e-vacAAAAJ&hl=en
- GitHub: https://github.com/samhsu-dev
- LinkedIn: https://www.linkedin.com/in/yichaoxu-jhu/
- Email: yxu166@jhu.edu
