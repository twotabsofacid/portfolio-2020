import { useEffect } from 'react';

/**
 * Preview, get preview data if we hit the appropriate URL
 * @param  {function} apiCall     Function to get the data
 * @param  {function} setData     Set the data function
 * @param  {function} setPreview  Set the preview function
 */
export default function preview(apiCall, setData, setPreview) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get('preview');
    if (preview) {
      const newPropsCall = async() => {
        const dataPreview = await apiCall(true);
        return {
          props: {dataPreview}
        }
      }
      newPropsCall().then(returnData => {
        if (returnData) {
          setData(returnData.props.dataPreview.fields);
          setPreview(true);
        }
      });
    }
  }, [apiCall]);
}
