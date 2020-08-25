import * as actions from './type'

export const success = message => ({
    type: actions.ALERT_SUCCESS,
    payload: {
        message
    }
})

export const error = message => ({
    type: actions.ALERT_ERROR,
    payload: {
        message
    }
})