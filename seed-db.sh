#!/bin/bash
# Purpose: wrapper around the seed_db script so that it's run in the correct dir with correct params
# Usage: ./seed-db.sh
cd ./scripts/
SEEDING=true python3 seed_db.py