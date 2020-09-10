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
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    }
  ]

  return configBtn.map(templateButton).join('')
}

function templateButton(button) {
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
