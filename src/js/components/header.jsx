import React from 'react';

class Header extends React.Component{

    render(){
        return <div className="row">
            <div className="col-12">
                <div className="header">
                    <div className="col-6">
                        <div className="header-logo">Black-Jack</div>
                    </div>
                    <div className="col-6">
                        <div className="header-score"><span>User Score</span></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export {Header}

