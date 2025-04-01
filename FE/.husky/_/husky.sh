#!/bin/sh
# shellcheck shell=bash

# Ensure that the script can be executed from anywhere
export PATH="$PATH:$(npm bin)"

# Pass any arguments to the hook script
exec "$@"