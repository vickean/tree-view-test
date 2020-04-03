import React, { useReducer, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from "@material-ui/core";
import { TreeView, TreeItem, Autocomplete } from "@material-ui/lab";

const data = {
  0: {
    label: "Rice",
    id: "4b3957a4-75b4-11ea-bc55-0242ac130003",
    children: {
      0: {
        label: "Fried",
        id: "866c87b0-75b4-11ea-bc55-0242ac130003",
        children: {
          0: {
            label: "with Egg",
            id: "1b013c0e-75b5-11ea-bc55-0242ac130003",
          },
          1: {
            label: "with Chilli",
            id: "3e4be678-75b5-11ea-bc55-0242ac130003",
          },
          2: {
            label: "with Ikan Bilis",
            id: "5acd62b8-75b5-11ea-bc55-0242ac130003",
          },
        },
      },
      1: {
        label: "Steamed",
        id: "777e4940-75b5-11ea-bc55-0242ac130003",
        children: {
          0: {
            label: "with Fried Chicken",
            id: "bb498c89-955e-4306-8b07-033be95e1230",
          },
          1: {
            label: "with Sambal",
            id: "fdb871b2-69f3-4d5c-a37c-134561e93cfe",
          },
        },
      },
      2: {
        label: "Porridge",
        id: "9cddd2aa-75b5-11ea-bc55-0242ac130003",
        children: {
          0: {
            label: "with Salted Egg",
            id: "d66d4227-52e7-412a-bea6-fd24945dc7ac",
          },
          1: {
            label: "with Preseved Lettuce",
            id: "06507a75-00fb-4c4a-87e8-0becbc21b4e4",
          },
        },
      },
    },
  },
  1: {
    label: "Noodles",
    id: "27ef068a-d972-4726-b12e-fdf33f77719b",
    children: {
      0: {
        label: "Fried",
        id: "75dab206-7953-42b8-8367-0a4412ddb933",
        children: {
          0: {
            label: "with Shrimp",
            id: "6a3a236b-7e5c-45b0-9a41-2db1313ef02d",
          },
          1: {
            label: "with Cabbages",
            id: "d7190521-0657-416b-b621-8412de2f06d1",
          },
        },
      },
      1: {
        label: "Soup",
        id: "c30f2211-47d6-4775-a083-e547fd733c40",
        children: {
          0: {
            label: "with Fish Balls",
            id: "1813bc24-57f0-441d-b495-880e3b182ae9",
          },
          1: {
            label: "with Shredded Chicken",
            id: "a9983ad1-f217-4807-88e1-0ea9840b406a",
          },
        },
      },
    },
  },
};

export default function App() {
  const initialState = {
    selectedOptions: new Set(),
    renderSource: {},
    renderComps: "",
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      default:
        return { ...prevState, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "renderSource",
      payload: data,
    });
  }, []);

  useEffect(() => {
    if (state.renderSource) {
    }
  }, [state.renderSource]);

  console.log(Object.values(state.renderSource));

  const CheckTreeItem = (props) => {
    const { children, id, label } = props;

    const idExists = state.selectedOptions.has(id);

    const content = (
      <div>
        <Checkbox
          onClick={(e) => e.stopPropagation}
          checked={idExists}
          onChange={() => {
            if (idExists) {
              let newSet = new Set(state.selectedOptions);
              newSet.delete(id);
              dispatch({
                type: "selectedOptions",
                payload: newSet,
              });
            } else {
              let newSet = new Set(state.selectedOptions);
              newSet.add(id);
              dispatch({
                type: "selectedOptions",
                payload: newSet,
              });
            }
          }}
        />
        {label}
      </div>
    );

    // use TransitionProps={{in:true | false}} to toggle whether the TreeItem can reveal it's children

    const treeItemProps = idExists ? { TransitionProps: { in: false } } : {};

    return (
      <TreeItem nodeId={id} label={content} {...treeItemProps}>
        {children}
      </TreeItem>
    );
  };

  return (
    <div className="App" style={{ margin: "auto", padding: "2rem" }}>
      <h1>Food List</h1>

      <TextField
        value={Array.from(state.selectedOptions).join(" | ")}
        label="Selected Items"
        variant="outlined"
        disabled
        multiline
        fullWidth
      />

      <TreeView>
        <CheckTreeItem id="aasd" label="aasd">
          <CheckTreeItem id="aadf" label="aadf">
            <CheckTreeItem id="aafd" label="aafd" />
            <CheckTreeItem id="aads" label="aads" />
            <CheckTreeItem id="ssdf" label="ssdf" />
          </CheckTreeItem>
          <CheckTreeItem id="ssfd" label="ssfd">
            <CheckTreeItem id="ssaf" label="ssaf" />
            <CheckTreeItem id="ssda" label="ssda" />
            <CheckTreeItem id="ssad" label="ssad" />
          </CheckTreeItem>
          <CheckTreeItem id="ddfa" label="ddfa">
            <CheckTreeItem id="ddaf" label="ddaf" />
            <CheckTreeItem id="ddfs" label="ddfs" />
            <CheckTreeItem id="ddsf" label="ddsf" />
          </CheckTreeItem>
        </CheckTreeItem>
        <CheckTreeItem id="ddsa" label="ddsa">
          <CheckTreeItem id="ddas" label="ddas">
            <CheckTreeItem id="ffas" label="ffas" />
            <CheckTreeItem id="ffsa" label="ffsa" />
          </CheckTreeItem>
          <CheckTreeItem id="ffsd" label="ffsd">
            <CheckTreeItem id="ffds" label="ffds" />
            <CheckTreeItem id="ffok" label="ffok" />
          </CheckTreeItem>
        </CheckTreeItem>
      </TreeView>
    </div>
  );
}
