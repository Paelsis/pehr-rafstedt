export const SET_ZOOM='SET_ZOOM'


export const setZoom = (zoom) => ({
      type: SET_ZOOM,
      zoom,
})
  
export default (state = 0, action) => {
    switch (action.type) {
      case 'SET_ZOOM':
        return action.zoom
      default:
        return state
    }
}
  