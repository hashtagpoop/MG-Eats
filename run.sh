#!/bin/bash
# Purpose: simple wrapper around the server bringup command to run in diff environments
# Usage: ./run.sh
uvicorn main:app --reload