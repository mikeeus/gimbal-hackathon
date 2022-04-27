import { useMoralis, useERC20Balances } from "react-moralis";
import { useState } from "react";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "../../helpers/formatters";

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
  const { Moralis } = useMoralis();
  const [show, setShow] = useState(false);

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "https://etherscan.io/images/main/empty-token.png"}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Address",
      dataIndex: "token_address",
      key: "token_address",
      render: (address) => getEllipsisTxt(address, 5),
    },
  ];

  var displayAssets = () => {
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
      <div
        style={{
          display: show ? "block" : "none",
          marginTop: "20px",
        }}
      >
        <Skeleton loading={!assets}>
          <Table
            style={{ borderRadius: "15px" }}
            dataSource={assets}
            columns={columns}
            rowKey={(record) => {
              return record.token_address;
            }}
          />
        </Skeleton>
      </div>
    </div>
  );
}

export default UserAssets;
