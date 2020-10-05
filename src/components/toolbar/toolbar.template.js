export function createToolbar(state) {
  // console.log(state)
  // config генерируется на основе передаваемого state
  const configBtn = [
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold', // если равно, значит true
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'} // значение, которое будет взято при следующем клике и передано в state, который после снова передаётся сюда и снова меняет config
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] && state['fontStyle'] === 'italic',
      // eslint-disable-next-line max-len
      value: {fontStyle: state['fontStyle'] && state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state[`textDecoration`] === 'underline' ? 'none' : 'underline'}
    },
    'separator',
    {
      icon: 'format_align_left',
      active: state['justifyContent'] === 'flex-start',
      value: {justifyContent: 'flex-start'}
    },
    {
      icon: 'format_align_center',
      active: state['justifyContent'] && state['justifyContent'] === 'center',
      value: {justifyContent: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['justifyContent'] === 'flex-end',
      value: {justifyContent: 'flex-end'}
    },
    'separator',
    {
      icon: 'vertical_align_top',
      active: state['alignItems'] === 'flex-start',
      value: {alignItems: 'flex-start'}
    },
    {
      icon: 'vertical_align_center',
      active: state['alignItems'] && state['alignItems'] === 'center',
      value: {alignItems: 'center'}
    },
    {
      icon: 'vertical_align_bottom',
      active: state['alignItems'] === 'flex-end',
      value: {alignItems: 'flex-end'}
    },
    'separator',
    // {
    //   icon: 'format_paint',
    //   active: state['alignItems'] === 'flex-start',
    //   value: {alignItems: 'flex-start'}
    // }
  ]

  return configBtn.map(templateButton).join('')
}

function templateButton(button) {
  if (button === 'separator') {
    return `
      <div class="border-right"></div>
    `
  }
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `

  return `
    <div 
      class="excel-toolbar__button${button.active ? ' active' : ''}"
      ${meta}>
        <span class="material-icons" ${meta}>${button.icon}</span>
    </div>
  `
}
