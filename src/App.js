import React, { PureComponent } from 'react';

import Files from 'react-files';
import FileSaver from 'file-saver';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';

import Delete from 'material-ui-icons/Delete';
import Folder from 'material-ui-icons/Folder';
import PlayArrow from 'material-ui-icons/PlayArrow';

import SaveFile from './components/SaveFile.jsx';
import SelectTheme from './components/SelectTheme.jsx';

import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/chrome';
import 'brace/theme/github';
import 'brace/theme/monokai';

import api from './services/api';
import Console from './components/Console.jsx';


class Editor extends PureComponent {
  constructor(props) {
    super(props);

    this.fileReader = new FileReader();

    this.state = {
      cursor: 1,
      filename: '',
      theme: 'github',
      annotations: []
    };
  };

  onChange = (value) => {
    this.setState({ code: value });
  };

  setTheme = name => event => {
    this.setState({ [name]: event.target.value });
  };

  setFilename = (event) => {
    this.setState({ filename: event.target.value });
  };

  getTokens = async () => {
    this.setState({ tokens: undefined });
    this.setState({ errors: undefined });
    this.setState({ annotations: [] });

    await api.post('/compile', {code: this.state.code})
    .then((res) => {
      var tokens = '';
      var errors = '';
      this.setState({ annotations: [] });

      const lexer = res.data.lexer;
      lexer.forEach((item) => {
        if (item.type === 'INVALIDO') {
          tokens += `<'${item.type}' : ${item.value} at (${item.lineno}, ${item.lexpos})>\n`;
          errors += `Erro léxico '${item.value}' na linha ${item.lineno} e coluna ${item.lexpos}\n`;
          this.setState({ annotations: [
            this.state.annotations,
            {
              row: item.lineno-1,
              column: item.lexpos-1,
              type:  'error',
              text: 'Erro lexico'
            }
          ]});
        } else {
          tokens += `<${item.type} : '${item.value}' at (${item.lineno}, ${item.lexpos})>\n`;
        }
      })

      if (errors.length <= 0) {
        const parser = res.data.parser;
        parser.forEach((item) => {
          errors += `Erro sintático '${item.value}' na linha ${item.lineno} e coluna ${item.lexpos}\n`;
          this.setState({ annotations: [
            this.state.annotations,
            {
              row: 3,
              column: item.lexpos,
              type:  'error',
              text: 'Erro sintatico'
            }
          ]});
        })
      }

      if (errors.length > 0) {
        this.setState({ tokens: tokens, errors: errors });
      } else {
        errors += 'Compilado com sucesso!'
        this.setState({ tokens: tokens, errors: errors });
      }
    });
  };

  openFile = (event) => {
    const file = event[0];
    const reader = this.fileReader;

    reader.onload = (event) => {
      this.setState({ "code": event.target.result });

    }

    reader.readAsText(file);
    event.pop()
  };

  saveFile = () => {
    const blob = new Blob([this.state.code], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `${this.state.filename}.jv`);
  };

  clear = () => {
    this.setState({ code: undefined, tokens: undefined, errors: undefined, background: undefined });
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: '#2BBBAD', width: '100%'}}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ paddingRight: '30px' }}>
              PyDuino
            </Typography>
            <Files
              className='files-dropzone'
              onChange={this.openFile}
              onError={this.onFilesError}
              accepts={['.jv']}
              maxFileSize={1000}
              minFileSize={0}
              clickable
            >
              <Tooltip id="tooltip-bottom" title="Abrir" placement="bottom">
                <Button><Folder style={{ 'color': '#ffffff' }} /></Button>
              </Tooltip>
            </Files>

            <SaveFile saveFile={this.saveFile} filename={this.state.filename} setFilename={this.setFilename}/>

            <Tooltip id="tooltip-bottom" title="Compilar" placement="bottom">
              <Button onClick={this.getTokens}><PlayArrow style={{ 'color': '#ffffff' }} /></Button>
            </Tooltip>
            <Tooltip id="tooltip-bottom" title="Limpar" placement="bottom">
              <Button onClick={this.clear}><Delete style={{ 'color': '#ffffff' }} /></Button>
            </Tooltip>
            <SelectTheme theme={this.state.theme} setTheme={this.setTheme}/>
          </Toolbar>
        </AppBar>

        <AceEditor
          mode="python"
          theme={this.state.theme}
          name="code"
          onLoad={this.onLoad}
          onChange={this.onChange}
          height={"64vh"}
          width={"100%"}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code}
          setOptions={
            {
              showLineNumbers: true,
              tabSize: 4,
            }
          }
          annotations={this.state.annotations}
        />

        <Console tokens={this.state.tokens} errors={this.state.errors}/>
      </div>
    );
  }
}

export default Editor;
