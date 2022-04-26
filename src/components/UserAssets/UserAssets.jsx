import { useERC20Balances } from "react-moralis";
import { useState } from "react";

const styles = {
  walletIcon: {
    width: "40px",
    height: "40px",
  },
  h1: {
    marginLeft: "15px",
    letterSpacing: "1.2px",
    paddingRight: "8px",
  },
  img: {
    height: "3vmin",
    width: "3vmin",
    marginLeft: "3vmin",
  },
  div: {
    display: "flex",
    alignItems: "center",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "100vmin",
  },
  arrow: {
    height: "3.4vmin",
    float: "right",
    marginRight: "3vmin",
  },
  table: {
    height: "auto",
    width: "1000px",
    position: "absolute",
    top: "200px",
  },
  plusImgContainer: {
    flex: "1",
    position: "relative",
  },
};

function UserAssets(props) {
  const { data: assets } = useERC20Balances(props);
  console.log(assets);

  const [show, setShow] = useState(false);

  var displayAssets = () => {
    console.log("clicked");
    setShow((current) => !current);
  };

  return (
    <div>
      <div id="wallet" style={styles.div}>
        <img src={require("./wallet.png")} style={styles.img} />
        <h1 style={styles.h1}>Wallet</h1>
        <div style={styles.plusImgContainer}>
          <img
            onClick={displayAssets}
            src={require("./maximize.png")}
            style={styles.arrow}
          />
        </div>
      </div>
      <div style={styles.table}>
        <table style={{ display: show ? "block" : "none" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Balance</th>
              <th>Address</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default UserAssets;
