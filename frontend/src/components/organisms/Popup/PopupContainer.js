export function AddPopup({
  children,
  title = '',
  onAccept = null,
  onCancel = null,
}) {
  const event = new CustomEvent('popup:add', {
    detail: {
      children,
      title,
      onAccept,
      onCancel,
    },
  });
  document.dispatchEvent(event);
}
