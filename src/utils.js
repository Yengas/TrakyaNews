function mapImage(img){
  return !img ? img : img.src ? img.src : img;
}
/**
 * Maps the given state item to props object.
 * @param item
 * @return {{id, title: string|number, date, views: number | *, content, href, thumb, images: *[], files: *[], isError: {failed: boolean}|detail|{failed}|{failed: boolean, reason: string}|items.h-test.detail|{failed, reason}|*}}
 */
export function mapStateItemToProps(item){
  const isError = item.detail && item.detail.failed;

  return {
    id: item.id, title: item.title, date: item.date, views: item.hitCount, content: item.content,
    href: item.href, thumb: item.thumb, images: [...(item.images || []), ...((item.extras || {}).images || [])].map(mapImage),
    files: [...((item.extras || {}).files || [])],
    isError: isError, errorReason: isError ? item.detail.reason : null, isLoading: !isError && !item.content && !item.views,
  };
}