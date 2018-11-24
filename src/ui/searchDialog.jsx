import React from 'react';

export class SearchDialog extends React.Component {

  render() {
    const {
      open,
      onSearch,
      onCancel,
    } = this.props;

    const top = open ? "100%-2" : "100%";

    return (
      <box top={top}
           left={-1}
           width="100%+2"
           height={3}
           border={{type: 'line'}}
           style={{border: {fg: 'green'}}} >
        Filter:
        <textbox left={8}
                 onSubmit={onSearch}
                 onCancel={onCancel}
                 inputOnFocus
                 focused={open} />
      </box>
    );
  }
}

