# 📝 Bài tập

---

## ✅ Bài 1: Khởi tạo Head và Kiểm tra Trạng thái (Idle to Init)

### 📌 Tình huống

Bạn là Alice và đang cố gắng khởi tạo một Hydra Head với Bob. Bạn đã chạy lệnh:
`echo '{ "tag": "Init" }' | websocat "ws://127.0.0.1:4001?history=no"`
nhưng không nhận được phản hồi `"tag": "HeadIsInitializing"`.

### 🚀 Yêu cầu

1. Viết lệnh kiểm tra xem các Node của Alice và Bob đã thực sự kết nối P2P với nhau chưa.
2. Nếu trường `"networkConnected"` trả về `false`, hãy nêu 2 nguyên nhân kỹ thuật có thể xảy ra.

<details>
<summary>Đáp án</summary>

1.  **Lệnh kiểm tra:** `websocat ws://127.0.0.1:4001 | jq '.networkInfo'`
2.  **Nguyên nhân:** _ Sai địa chỉ IP/Port trong tham số `--peer` khi khởi chạy Node.
_ Firewall (tường lửa) chặn cổng P2P (thường là 5001/5002).
</details>

---

## ✅ Bài 2: Quy trình Commit và Xác thực UTxO

### 📌 Tình huống

Alice muốn cam kết (commit) một UTxO có giá trị **50 ADA** vào Head.

### 🚀 Yêu cầu

Hãy viết trình tự các lệnh (Workflow) để Alice hoàn tất việc đưa 50 ADA này vào trạng thái sẵn sàng của Head. (Giả sử bạn đã có file `alice-funds.sk`).

<details>
<summary>Đáp án</summary>

1.  **Xuất UTxO:** `cardano-cli query utxo --testnet-magic 2 --address $(cat credentials/alice-funds.addr) --out-file commit-utxo.json`
2.  **Tạo Tx Commit:** `curl -X POST 127.0.0.1:4001/commit --data @commit-utxo.json > commit-tx.json`
3.  **Ký giao dịch:** `cardano-cli latest transaction sign --tx-file commit-tx.json --signing-key-file credentials/alice-funds.sk --out-file signed.json`
4.  **Submit:** `cardano-cli latest transaction submit --testnet-magic 2 --tx-file signed.json`
</details>

---

## ✅ Bài 3: Xây dựng Giao dịch Off-chain (NewTx)

### 📌 Tình huống

Head đã ở trạng thái `Open`. Alice muốn gửi cho Bob **10 ADA** (10.000.000 lovelace).

### 🚀 Yêu cầu

1. Tại sao trong lệnh `cardano-cli latest transaction build-raw`, tham số `--fee` phải bằng `0`?
2. Viết cấu trúc lệnh JSON (`NewTx`) để gửi giao dịch đã ký (`tx-signed.json`) vào Hydra Node qua WebSocket.

<details>
<summary>Đáp án</summary>

1.  **Lý do:** Các giao dịch bên trong Hydra Head (Off-chain) không tốn phí mạng lưới Cardano (L1 Fee).
2.  **Lệnh gửi:** `bash
    cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}' | websocat "ws://127.0.0.1:4001?history=no"
    `
</details>

---

## ✅ Bài 4: Đóng Head và Giai đoạn Tranh chấp (Contestation)

### 📌 Tình huống

Sau khi thực hiện nhiều giao dịch, Bob quyết định đóng Head bằng lệnh `Close`. Hệ thống trả về thông tin `"contestationPeriod": 600`.

### 🚀 Yêu cầu

1. Ý nghĩa của con số `600` ở trên là gì?
2. Trong khoảng thời gian này, Alice có thể thực hiện thêm giao dịch chuyển tiền cho Bob off-chain nữa không? Tại sao?

<details>
<summary>Đáp án</summary>

1.  **Ý nghĩa:** 600 giây (10 phút) là khoảng thời gian chờ để các bên kiểm tra tính trung thực của Snapshot cuối cùng trước khi tài sản được giải phóng về L1.
2.  **Trả lời: KHÔNG.** Khi lệnh `Close` đã được thực thi, trạng thái Head chuyển sang `Closed`, mọi hoạt động ký giao dịch off-chain mới đều bị từ chối để chốt sổ.
</details>

---

## ✅ Bài 5: Giải phóng tài sản (Fanout)

### 📌 Tình huống

Thời gian tranh chấp đã kết thúc. Bạn cần đưa tài sản từ Layer-2 trở lại ví Layer-1 của mình.

### 🚀 Yêu cầu

1. Viết lệnh để thực hiện bước `Fanout`.
2. Sau khi lệnh `Fanout` thành công, trạng thái của Head hiển thị trong WebSocket (`headStatus`) sẽ là gì?

<details>
<summary>Đáp án</summary>

1.  **Lệnh thực hiện:** `echo '{ "tag": "Fanout" }' | websocat "ws://127.0.0.1:4001?history=no"`
2.  **Trạng thái:** Head sẽ quay trở lại trạng thái **`Idle`**, sẵn sàng cho một vòng đời khởi tạo mới.
</details>

---
