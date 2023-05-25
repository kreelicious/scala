import React, {useEffect } from 'react'

const EventBriteWidget = ({ eventId }) => {

  const exampleCallback = () => {
    console.log('Order complete!');
  };

  useEffect(() => {
    if(eventId){
     
    window.EBWidgets.createWidget({
      widgetType: 'checkout',
      eventId: eventId,
      iframeContainerId: 'example-widget-trigger',
      iframeContainerHeight: 425,
      onOrderComplete: exampleCallback,
    });
    }
  }, [eventId])
  
  
  return (
    <div id="example-widget-trigger"></div>
  )
}

export default EventBriteWidget