import ModifyScript from "./Components/ModifyScript"
import { ScriptsState } from "@/state/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState, useEffect } from "react"
import Grid from '@mui/material/Unstable_Grid2';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NotesIcon from "@mui/icons-material/Notes";
import DeleteIcon from "@mui/icons-material/Delete";
import useMessage from "@/hooks/useMessage";
import { createScript, listScripts, editScript, deleteScript } from "@/api/scripts_api";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
function UserScripts() {
  const scripts = useRecoilValue(ScriptsState);
  const setScripts = useSetRecoilState(ScriptsState);
  const [name, setName] = useState('');
  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');
  const [originName, setOriginName] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, { addMessage }] = useMessage();
  let dialog = (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>确认删除</DialogTitle>
      <DialogContent>是否确认删除</DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            handleDelete(originName);
            setDialogOpen(false);
          }}
        >
          确认
        </Button>
        <Button onClick={() => setDialogOpen(false)}>取消</Button>
      </DialogActions>
    </Dialog>
  );
  const handleDelete = (originName) => {
    (async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await deleteScript(originName);
        setScripts(await listScripts());
        setOriginName(null);
        addMessage("success", "删除成功");
      } catch (e) {
        addMessage("error", "删除失败");
      } finally {
        setLoading(false);
      }
    })();
  };
  return (
    <Grid>
      <Grid>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "300px",
              zIndex: "1",
            },
          }}
          open
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => {
                setOriginName(null);
                setName('');
                setCode('function add(a, b) {\n  return a + b;\n}');
              }}>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText primary="新建脚本" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {scripts.map((m) => (
              <ListItem key={m.name}>
                <ListItemButton onClick={() => {
                  setOriginName(m.name);
                  setName(m.name);
                  setCode(m.code);
                }}>
                  <ListItemIcon >
                    <DeleteIcon onClick={() => setDialogOpen(true)} />
                  </ListItemIcon>

                  <ListItemText
                    primary={m.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>

      <Grid
        fullWidth
        sx={{
          paddingLeft: {
            xs: 0,
            sm: "310px",
          },
        }}
      >
        <ModifyScript nameState={[name, setName]} codeState={[code, setCode]} originState={[originName, setOriginName]} />
      </Grid>
      {dialog}
    </Grid>
  );
}
export default UserScripts;
