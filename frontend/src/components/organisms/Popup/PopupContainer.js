export function AddPopup({
  children,
  title = '',
  onAccept = null,
  onCancel = null,
  showCancel = true,
}) {
  const event = new CustomEvent('popup:add', {
    detail: {
      children,
      title,
      onAccept,
      onCancel,
      showCancel,
    },
  });
  document.dispatchEvent(event);
}
