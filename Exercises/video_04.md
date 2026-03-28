# 📝 Bài tập

---

### ✅ Bài 1: Hạn chế của Layer-1 (Cardano L1)

**📌 Đề bài:** Phân tích **3 hạn chế chính** của Cardano Layer-1 và giải thích tại sao chúng gây khó khăn cho ứng dụng thực tế.

- **Gợi ý:** TPS, Block time, Phí giao dịch.

<details>
<summary>Đáp án</summary>

1.  **TPS thấp (~250 TPS):** Không đủ cho các ứng dụng có hàng nghìn người dùng cùng lúc (Ví dụ: DEX sẽ bị nghẽn lệnh).
2.  **Block time ~20s:** Quá chậm cho các tương tác thời gian thực (Ví dụ: Gaming cần phản hồi < 1s).
3.  **Phí tăng khi tắc nghẽn:** Làm giảm trải nghiệm người dùng khi thực hiện các giao dịch nhỏ (Micropayments).
👉 **Kết luận:** Layer-1 tối ưu hóa cho Bảo mật và Phi tập trung nên cần Layer-2 để giải quyết Hiệu năng.
</details>

---

### ✅ Bài 2: Cơ chế vận hành Hydra Head

**📌 Đề bài:** Mô tả quy trình 3 bước vận hành một Hydra Head và vai trò của tính năng "Off-chain".

<details>
<summary>Đáp án</summary>

1.  **Mở Head:** Lock/Commit tài sản từ Layer-1 vào Smart Contract.
2.  **Giao dịch:** Các bên tương tác trực tiếp off-chain với tốc độ tức thì và phí gần như bằng 0.
3.  **Đóng Head:** Ghi lại trạng thái cuối cùng (Final State) lên Layer-1 để giải phóng tài sản về ví.
👉 **Kết quả:** Nhanh như tập tin cục bộ nhưng an toàn nhờ sự bảo chứng của Layer-1.
</details>

---

### ✅ Bài 3: Sự phụ thuộc của Hydra vào Cardano Node

**📌 Đề bài:** Tại sao Hydra Node không thể chạy độc lập? Hãy nêu 3 chức năng cốt lõi mà Cardano Node cung cấp cho Hydra.

<details>
<summary>Đáp án</summary>

Hydra là giải pháp **Isomorphic L2**, nó cần "nhìn" thấy Layer-1 để hoạt động:

1.  **Commit tài sản:** Xác minh input/output trên L1 để mở Head.
2.  **Neo trạng thái (Anchoring):** Snapshot của L2 phải được tham chiếu dựa trên các tham số giao thức (protocol parameters) từ L1.
3.  **Đồng bộ tuyệt đối:** Đảm bảo tính xác định để có thể thực hiện quy trình đóng Head (Close/Fanout) mà không bị xung đột dữ liệu.
</details>

---

### ✅ Bài 4: Tối ưu hóa đồng bộ bằng Mithril

**📌 Đề bài:** So sánh phương pháp đồng bộ truyền thống và **Mithril**. Tại sao nhà phát triển nên ưu tiên Mithril khi triển khai Hydra?

<details>
<summary>Đáp án</summary>

| Tiêu chí           | Sync Truyền thống   | Mithril (Khuyên dùng)       |
| :----------------- | :------------------ | :-------------------------- |
| **Thời gian sync** | ~50 phút+ (Preview) | ~15 phút                    |
| **Dung lượng tải** | ~90GB (Mainnet)     | ~2.5GB                      |
| **Bảo mật**        | SHA256 Checksum     | Multi-signature (Đa chữ ký) |

👉 **Lý do:** Giúp thiết lập hạ tầng (Infra) cực nhanh, giảm chi phí lưu trữ và băng thông, đặc biệt quan trọng khi cần scale nhiều Hydra Nodes.

</details>

---

### ✅ Bài 5: Kiểm tra trạng thái sẵn sàng (Health Check)

**📌 Đề bài:** Sau khi chạy Cardano Node 10.5.x, làm thế nào để xác nhận hệ thống đã sẵn sàng cho Hydra? Nêu lệnh CLI và chỉ số cần kiểm tra.

<details>
<summary>Đáp án</summary>

- **Lệnh thực hiện:** `cardano-cli query tip --testnet-magic 2`
- **Chỉ số quan trọng:** `syncProgress` phải đạt **`100.00`**.
- **Giải thích:** Nếu Node chưa đồng bộ 100%, Hydra sẽ không thể thấy được các giao dịch commit mới nhất trên Layer-1, dẫn đến lỗi khi mở Head.
</details>

---
