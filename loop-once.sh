#!/bin/bash

claude --permission-mode acceptEdits "@PRD.md @progress.txt
1. Read the PRD and progress file.
2. Find the next incomplete task.
3. Implement the task.
4. Update progress.txt with what you did.
ONLY DO ONE TASK AT A TIME."