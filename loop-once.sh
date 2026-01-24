#!/bin/bash

claude --permission-mode acceptEdits "@PRD.md @progress.txt
1. Read the PRD and progress file.
2. Find the next incomplete task.
3. Implement the task.
4. Commit your changes.
5. Update progress.txt with what you did.
6. Update the PRD status with what was done.
ONLY DO ONE TASK AT A TIME."