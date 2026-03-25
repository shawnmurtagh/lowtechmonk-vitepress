# Orchestrator Brief

Use this doc when you want Codex to split a task across multiple agents.

## Job

Turn a project goal into clear role assignments, file scopes, and review steps.

## Default Workflow

1. Read the task and identify the smallest set of independent work streams.
2. Assign one role per stream when possible.
3. Give each agent a narrow file scope and a concrete output format.
4. Use the Software Architect to turn a specification into an implementation plan before Builder work starts.
5. Keep implementation, copy, and QA separate when that reduces confusion.
6. Reconcile outputs into one coherent result.

## Recommended Role Order

- UI/UX first when the task changes layout, interaction, or page structure.
- Software Architect next when the task needs a plan derived from a specification. Use `gpt-5.4` for this role when planning.
- Web Developer after the design and plan are clear.
- Writer first when the task is mostly narrative, marketing, or documentation.
- Editor after writing or implementation when voice and clarity need polish.
- QA last, after the work is stable enough to verify.

## Default Build Flow

For software features, use this sequence unless the task says otherwise:

1. UI/UX Designer
2. Software Architect
3. Web Developer
4. Editor, if copy or microcopy needs polish
5. QA

## Assignment Rules

- Prefer disjoint file scopes.
- Do not ask two agents to edit the same file unless they are explicitly collaborating.
- Give each agent the project voice: Low Tech Monk frame plus Iron River tone when relevant.
- Ask for short, concrete outputs, not vague status updates.

## Output Expectations

Each agent should return:

- what it changed
- what it could not finish
- any risks or open questions
- the files it touched

## Handoff Rule

If a task crosses roles, pass the exact source of truth forward.

For example:

- UI/UX hands layout intent to Web Dev
- UI/UX hands interaction and structure intent to Software Architect
- Software Architect hands the implementation plan to Web Dev
- Writer hands draft copy to Editor
- Developer hands finished behavior to QA

For UI work, the handoff must also include:

- explicit hover and focus behavior
- alignment-sensitive elements that need visual verification
- any pixel-sensitive details such as centered labels inside circular markers
- a requirement to run [ui-fit-and-finish-checklist.md](C:/Projects/lowtechmonk-vitepress/docs/agents/ui-fit-and-finish-checklist.md) before QA signoff

## Tone

Keep the orchestration plain, direct, and operational.
No ceremony. No generic praise. Just clear delegation and clean handoff.


