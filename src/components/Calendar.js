import React from 'react';
import './calendar.css'

const GoogleCalendar = (props) => {

    return (
        <div>
            <div className="smallDisplay">
                <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=AGENDA&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="mobileIframe" width="800" height="600" frameborder="0" scrolling="no"></iframe>
            </div>
            <div className="largeDisplay">
                <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=MONTH&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="desktopIframe" width="800" height="600" frameborder="0" scrolling="no"></iframe>
            </div>
        </div>
    )

}

export default GoogleCalendar;