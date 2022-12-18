import Grid from '@mui/material/Unstable_Grid2';
import {
  Tooltip,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import "./index.css"
import { useState } from "react"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { createScript, listScripts, editScript, deleteScript } from "@/api/scripts_api";
import useMessage from "@/hooks/useMessage";
import { ScriptsState } from "@/state/user";
import { useSetRecoilState } from "recoil";
import { useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
function ModifyScript(param) {
  const [code, setCode] = param.codeState;
  const [name, setName] = param.nameState;
  const [originName, setOriginName] = param.originState;
  const [loading, setLoading] = useState(false);
  const [, { addMessage }] = useMessage();
  const setScripts = useSetRecoilState(ScriptsState);
  const [myChange, setMyChange] = useState(false);
  const handleSave = () => {
    (async () => {

      if (loading) {

        return;
      }
      if (name === "") {
        addMessage("error", "保存失败：脚本名不能为空");
        return;
      }

      setLoading(true);
      const operateScript = originName === null ? createScript : editScript;
      try {
        await operateScript(name, code, originName);
        setScripts(await listScripts());
        setOriginName(name);
        addMessage("success", "保存成功");
      } catch (e) {
        addMessage("error", "保存失败：可能是脚本名重复");
      } finally {
        setLoading(false);
      }
    })();
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (myChange) {
        handleSave()
        setMyChange(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  })
  return (
    <Grid
      direction="column"
      justifyContent="center"
      className="script-container"
      fullWidth
    >
      <Grid>
        <Grid item xs><h1><strong >{originName === null ? "新建脚本" : "编辑脚本"}</strong></h1></Grid>


      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          variant="filled"
          label="脚本名"
          name="script_name"
          type="text"
          value={name}
          onChange={(arg) => { setName(arg.target.value); setMyChange(true); }}
        />
      </Grid>
      <Grid>
        <Editor
          value={code}
          onValueChange={code => { setCode(code), setMyChange(true) }}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
          }}
        />
        {/* <CodeEditor
          value={code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => { setCode(evn.target.value), setMyChange(true) }}
          padding={20}
          style={{
            fontSize: 20,
            backgroundColor: "#f5f5f5",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        /> */}
      </Grid>
    </Grid>
  );
}
export default ModifyScript;
