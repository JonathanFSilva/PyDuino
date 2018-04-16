import React, { PureComponent } from 'react';

import AceEditor from 'react-ace';
import 'brace/mode/python';

import 'brace/theme/chrome';
import 'brace/theme/github';
import 'brace/theme/monokai';

import api from './services/api';
import Bar from './components/Bar.jsx';
import Console from './components/Console.jsx';


class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'github',
    };
  };

  onChange = (value) => {
    this.setState({ code: value });
  };

  setTheme = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getTokens = async () => {
    this.setState({ tokens: undefined });
    this.setState({ errors: undefined });

    await api.post('/lexico', {code: this.state.code})
    .then((res) => {
      var tokens = '';
      var errors = '';

      const data = res.data.split('\n');
      data.forEach((item) => {
        if (item.includes("Caractere inválido")) {
          errors += item + "\n";
        } else {
          tokens += item + "\n";
        }
      })

      if (errors.length > 0) {
        this.setState({ color: '#CC0000', tokens: tokens, errors: errors });
      } else {
        this.setState({ color: '#007E33', tokens: tokens, errors: errors });
      }
    });
  };

  clear = () => {
    this.setState({ code: undefined, tokens: undefined, errors: undefined, color: undefined });
  }

  render() {
    return (
      <div>
        <Bar
          getTokens={this.getTokens}
          clear={this.clear}
          theme={this.theme}
          setTheme={this.setTheme}
        />

        <AceEditor
          mode="python"
          theme={this.state.theme}
          name="code"
          onLoad={this.onLoad}
          onChange={this.onChange}
          height={"64vh"}
          width={"100%"}
          fontSize={18}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code}
          setOptions={
            {
              showLineNumbers: true,
              tabSize: 4,
            }
          }
        />

        <Console tokens={this.state.tokens} errors={this.state.errors} color={this.state.color}/>
      </div>
    );
  }
}

export default Editor;
