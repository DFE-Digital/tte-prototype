# Prototype testing instructions

## Purpose

Evaluate a specified prototype version against its key user tasks.

## Version boundaries

When asked to test a version such as v4:

- Start at /v4/index
- Only test user-facing states belonging to v4
- Do not deliberately navigate into v3, v5 or other versions
- Do not perform destructive external actions
- Stop discovery when no meaningful unexplored v4 states remain

## Discovery

Before testing:

1. Inspect app/views/<version>
2. Inspect routes used by that version
3. Identify forms, links, buttons and conditional states
4. Establish the likely key user tasks
5. Build an inventory of reachable user-facing states

Source inspection is for discovery.

Do not mark something as working solely because the source appears to implement it.

## Browser testing

Use Playwright to test the running prototype.

For each journey:

1. Start from a known state
2. Perform actions as a user would
3. Record the resulting page/state
4. Explore meaningful decision branches
5. Exercise validation and recoverable error states
6. Check Back/change/restart paths where relevant
7. Continue until completion or a dead end

Check:

- navigation
- labels
- controls
- content clarity
- validation
- error handling
- feedback
- accessibility cues
- back navigation
- completion states
- dead ends

## Evidence

Take a screenshot of every distinct user-facing state.

Screenshots should be stored under:

tests/output/<version>/screenshots/

Never overwrite evidence from another version.

## Finding classification

Every task must be classified as:

- PASS
- PARTIAL
- FAIL
- NOT TESTABLE

Every issue must have:

- journey
- step
- expected behaviour
- observed behaviour
- evidence
- severity
- confidence
- recommendation

Severity:

- CRITICAL: prevents completion of a critical task
- HIGH: major obstacle or serious risk
- MEDIUM: significant friction but task remains achievable
- LOW: minor usability or consistency issue

Clearly distinguish:

- Browser observation
- Source-code observation
- Inference
- Recommendation

Never invent prototype behaviour or test results.

## Outputs

Create:

prototype-testing/output/<version>/report.md
prototype-testing/output/<version>/journey-map.md
prototype-testing/output/<version>/screenshots/

The report should contain:

1. Executive summary
2. Scope and environment
3. Key user tasks discovered
4. Task results
5. Findings
6. Dead ends
7. Untested/unverifiable behaviour
8. Prioritised recommendations
9. Retest criteria

The journey map must show every tested meaningful branch and link
screenshots to their corresponding states.
