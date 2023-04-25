export const reducer = function (state, action) {
  switch (action.type) {
    case 'modal_open': {
      return {
        ...state,
        modalIsOpen: true
      }
    }
    case 'modal_close': {
      return {
        ...state,
        modalIsOpen: false
      }
    }
    case 'change_text': {
      return {
        ...state,
        text: action.inputText
      }
    }
    case 'change_file': {
      return {
        ...state,
        file: action.inputFile
      }
    }
    case 'cancel_upload': {
      return {
        ...state,
        file: null,
        modalIsOpen: false
      }
    }
    case 'validate_input': {
      let hasError = false
      let errorMessage = ''

      if (state.text === '' && !state.file) {
        hasError = true
        errorMessage = 'Bitte füge ein Bild oder einen Satz hinzu.'
      }

      return {
        ...state,
        hasError,
        errorMessage,
        showErrorMessage: false
      }
    }
    case 'show_error_message': {
      return {
        ...state,
        showErrorMessage: true
      }
    }
    case 'reset_form': {
      return {
        ...state,
        showErrorMessage: false,
        modalIsOpen: false,
        file: null,
        text: '',
        hasError: false,
        errorMessage: ''
      }
    }
    default:
      return state
  }
}
