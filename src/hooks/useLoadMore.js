import { useState, useCallback } from 'react';

export default function useLoadMore(originalArray, loadSize) {
  const [sliceEnd, setSliceEnd] = useState(loadSize);
  const loadMore = useCallback(() => setSliceEnd(sliceEnd + loadSize), [
    sliceEnd,
    loadSize,
  ]);
  return [originalArray.slice(0, sliceEnd), loadMore];
}
