export function defaultFetchingState() {
  return {
    started: false,
    finished: false,
    success: false,
    errors: [],
  }
}

export function startFetchingState() {
  return {
    started: true,
    finished: false,
    success: false,
    errors: [],
  }
}

export function finishFetchingState(errors) {
  return {
    started: true,
    finished: true,
    success: !errors,
    errors,
  }
}
