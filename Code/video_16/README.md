<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Triển khai và Giới thiệu ứng dụng**

**Ra mắt cộng đồng và trình bày kết quả thực tế của ứng dụng, minh chứng hiệu năng, tốc độ và khả năng mở rộng của Hydra Layer 2 trong môi trường thực tế.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-9.0.0%2B-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-Ready-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## 📌 Giới thiệu

Trong phần này, chúng ta sẽ tập trung vào việc hoàn thiện và trình bày kết quả cuối cùng của dự án thông qua một bản demo đầy đủ, giúp thể hiện rõ toàn bộ luồng hoạt động của hệ thống. Đồng thời, bạn sẽ thực hiện đóng gói, triển khai và đưa ứng dụng vào môi trường thực tế.

Nội dung chính bao gồm:

- Trình bày demo toàn bộ luồng hoạt động của ứng dụng
- Đóng gói ứng dụng bằng Docker và thực hiện build
- Quản lý mã nguồn bằng Git một cách hiệu quả
- Triển khai ứng dụng lên các nền tảng như Vercel hoặc VPS
- Cấu hình tên miền riêng và giới thiệu sản phẩm tới cộng đồng

---

## 🎯 Mục tiêu

Phần này hướng đến việc giúp bạn hoàn thiện kỹ năng đưa một dự án từ giai đoạn phát triển đến triển khai thực tế, đồng thời có thể tự tin trình bày và giới thiệu sản phẩm.

Sau khi hoàn thành, bạn sẽ đạt được:

- Có khả năng demo và trình bày hệ thống một cách rõ ràng, mạch lạc
- Biết cách đóng gói và build ứng dụng bằng Docker
- Sử dụng Git để quản lý mã nguồn trong quá trình phát triển
- Triển khai ứng dụng lên môi trường production (Vercel, VPS)
- Cấu hình tên miền và đưa ứng dụng vào sử dụng thực tế

---

## 📚 Trình bày demo toàn bộ luồng hoạt động của ứng dụng

### 🚀 1. Truy cập ứng dụng

Người dùng bắt đầu bằng việc mở trình duyệt và truy cập vào địa chỉ của hệ thống. Trong quá trình phát triển, ứng dụng thường được chạy ở môi trường local với đường dẫn http://localhost:3000. Khi triển khai thực tế lên server hoặc VPS, người dùng sẽ truy cập thông qua domain hoặc địa chỉ IP tương ứng như http://<domain hoặc IP>.

Ngay sau khi trang web được tải, hệ thống sẽ tự động khởi tạo toàn bộ frontend và thực hiện bước kiểm tra trạng thái ban đầu của người dùng. Trong đó, quan trọng nhất là kiểm tra trạng thái kết nối ví blockchain. Ứng dụng sẽ xác định xem người dùng đã kết nối ví hay chưa thông qua các hook quản lý ví (ví dụ như useWallet).

Nếu người dùng chưa kết nối ví, hệ thống sẽ tự động điều hướng đến trang đăng nhập hoặc trang kết nối ví. Điều này nhằm đảm bảo rằng mọi thao tác trong ứng dụng đều được xác thực thông qua ví cá nhân, tránh các hành vi truy cập không hợp lệ và đảm bảo tính bảo mật trong toàn bộ hệ thống.

Khi ví được kết nối thành công, hệ thống sẽ khởi tạo các thông tin quan trọng như địa chỉ ví chính, stake address và các instance cần thiết để tương tác với blockchain. Từ thời điểm này, người dùng đã sẵn sàng để thực hiện các chức năng như commit, tip, claim hoặc fanout trong hệ sinh thái của ứng dụng.

---

🔐 **2. Kết nối ví (Wallet Connection)**

Sau khi truy cập vào hệ thống và được điều hướng đến trang đăng nhập, người dùng sẽ thực hiện bước kết nối ví blockchain để có thể sử dụng toàn bộ chức năng của ứng dụng. Đây là bước bắt buộc nhằm đảm bảo mọi giao dịch đều được xác thực thông qua ví cá nhân.

Đầu tiên, người dùng sẽ lựa chọn loại ví mà mình đang sử dụng, chẳng hạn như Eternl, Nami, Flint hoặc các ví hỗ trợ khác trong hệ sinh thái Cardano. Sau khi chọn ví phù hợp, người dùng nhấn vào nút Connect / Enable / Grant Access để cấp quyền truy cập cho ứng dụng.

Tại thời điểm này, trình duyệt sẽ kích hoạt extension của ví và yêu cầu người dùng xác nhận quyền kết nối. Người dùng cần đồng ý cấp quyền truy cập, và trong một số trường hợp có thể phải nhập mật khẩu ví để xác thực danh tính. Đây là bước quan trọng nhằm đảm bảo chỉ chủ sở hữu ví mới có thể kết nối và sử dụng ứng dụng.

Khi quá trình xác thực hoàn tất, ứng dụng sẽ nhận được các thông tin cơ bản từ ví như địa chỉ ví chính, stake address và các thông tin cần thiết để tương tác với blockchain. Hệ thống sẽ lưu các dữ liệu này vào state toàn cục để sử dụng xuyên suốt trong các chức năng như commit, tip, claim hoặc fanout.

Ngay sau khi kết nối thành công, người dùng sẽ được tự động chuyển hướng đến trang Dashboard. Tại đây, hệ thống sẽ hiển thị tổng quan thông tin tài khoản, bao gồm số dư ví, trạng thái kết nối và các chức năng chính của ứng dụng, giúp người dùng bắt đầu tương tác với hệ thống một cách nhanh chóng và liền mạch.

---

🧑‍💻 **3. Tạo Creator**

Tại trang Dashboard, sau khi đã kết nối ví thành công, người dùng có thể bắt đầu tạo một Creator mới trong hệ thống. Đây là bước quan trọng nhằm khởi tạo một thực thể đại diện cho nội dung hoặc dự án có thể nhận tip và tương tác trong Hydra.

Để thực hiện, người dùng nhấn vào nút “Tạo Creator” (hoặc chức năng tương tự được hiển thị trên giao diện). Hệ thống sẽ mở một form nhập liệu để người dùng cung cấp các thông tin cần thiết cho Creator mới.

Các trường thông tin bao gồm:

- Title: Tiêu đề của Creator hoặc dự án
- Description: Mô tả chi tiết nội dung hoặc mục tiêu của Creator
- Author: Tên người tạo hoặc đại diện
- Image: Hình ảnh đại diện giúp nhận diện Creator trên giao diện
- Thời gian hoạt động (nếu có): xác định khoảng thời gian Creator tồn tại hoặc hoạt động trong hệ thống

Sau khi người dùng điền đầy đủ thông tin, hệ thống sẽ tiến hành xác thực dữ liệu và yêu cầu người dùng ký giao dịch thông qua ví đã kết nối. Đây là bước đảm bảo rằng việc tạo Creator được ghi nhận và xác thực on-chain hoặc thông qua logic hệ thống tương ứng.

Khi quá trình tạo hoàn tất thành công, Creator mới sẽ được lưu vào hệ thống và hiển thị trong danh sách chung. Tại thời điểm này, Creator đã sẵn sàng tham gia vào toàn bộ luồng hoạt động của ứng dụng, bao gồm nhận tip, commit tài sản hoặc tương tác với Hydra Head tùy theo logic được thiết kế.

---

💰 **4. Commit tài sản vào Hydra Head**

Để tham gia vào Hydra Head, người dùng cần thực hiện bước commit tài sản từ Layer 1 vào Layer 2, đây là cơ chế cốt lõi giúp đưa UTxO vào môi trường xử lý nhanh của hệ thống Hydra.

Trước tiên, người dùng sẽ lựa chọn một UTxO (Unspent Transaction Output) từ ví cá nhân của mình. Đây là đơn vị tài sản cơ bản trong Cardano, đại diện cho số dư chưa được sử dụng. Sau khi chọn UTxO phù hợp, người dùng nhấn vào nút “Commit vào Hydra Head” để bắt đầu quá trình giao dịch.

Hệ thống sẽ tạo một transaction tương ứng và gửi yêu cầu ký lên ví của người dùng. Tại bước này, ví (ví dụ Eternl hoặc các ví tương thích khác) sẽ hiển thị thông tin giao dịch để người dùng xác nhận. Người dùng cần ký giao dịch để xác thực quyền sở hữu và cho phép chuyển UTxO vào Hydra Head.

Sau khi transaction được ký và gửi thành công, UTxO sẽ được đưa vào trạng thái xử lý trong Hydra. Lúc này, hệ thống sẽ cập nhật lại trạng thái của Hydra Head, thường chuyển sang trạng thái “đang hoạt động” hoặc “đã nhận commit”, tùy theo logic state machine hiện tại của hệ thống.

Đồng thời, UTxO vừa commit sẽ không còn hiển thị trong ví Layer 1 nữa mà sẽ xuất hiện trong danh sách tài sản bên trong Hydra Head. Điều này giúp người dùng theo dõi rõ ràng phần tài sản đang được sử dụng trong môi trường off-chain, sẵn sàng cho các giao dịch nhanh như tip, claim hoặc decommit.

---

🔄 **5. Thực hiện Tip**

Sau khi đã có Creator và tài sản được commit vào Hydra Head, người dùng có thể bắt đầu thực hiện chức năng tip để gửi giá trị cho Creator một cách nhanh chóng trong môi trường Layer 2.

Đầu tiên, người dùng sẽ chọn Creator mà mình muốn tip từ danh sách hiển thị trên giao diện. Đây là các Creator đã được tạo và đang hoạt động trong hệ thống Hydra. Sau đó, người dùng nhập số lượng ADA muốn gửi, đảm bảo giá trị hợp lệ và không vượt quá số dư hiện có trong Hydra.

Khi đã hoàn tất việc nhập thông tin, người dùng nhấn nút “Tip” để khởi tạo giao dịch. Hệ thống sẽ tạo một transaction tương ứng trong Hydra và gửi yêu cầu ký đến ví của người dùng. Ví blockchain sẽ hiển thị thông tin giao dịch để người dùng xác nhận, từ đó đảm bảo rằng mọi giao dịch đều được thực hiện dưới sự kiểm soát của chủ sở hữu tài sản.

Sau khi giao dịch được ký và xử lý thành công trong Hydra Head của Hydra, hệ thống sẽ cập nhật ngay lập tức trạng thái giao diện. Người dùng sẽ thấy số dư thay đổi tương ứng, đồng thời lịch sử tip cũng được cập nhật real-time mà không cần tải lại trang.

Ở tầng backend, một snapshot mới của trạng thái Hydra sẽ được tạo ra để đảm bảo tính nhất quán giữa các participant trong cùng một Head. Điều này giúp toàn bộ hệ thống luôn đồng bộ và phản ánh chính xác trạng thái tài sản sau mỗi giao dịch.

Cuối cùng, số dư của Creator trong smart contract hoặc trong trạng thái Hydra sẽ được tăng lên tương ứng với số ADA đã được tip, đảm bảo tính chính xác và minh bạch trong toàn bộ luồng giao dịch.

---

➕ **6. Commit thêm tài sản**

Trong quá trình sử dụng Hydra Head, người dùng không bị giới hạn chỉ commit một lần mà có thể tiếp tục bổ sung tài sản bất kỳ lúc nào. Đây là một đặc điểm quan trọng của mô hình Layer 2 trong Hydra, cho phép mở rộng thanh khoản linh hoạt mà không ảnh hưởng đến trạng thái đang hoạt động của hệ thống.

Khi muốn tăng thêm số dư trong Hydra Head, người dùng sẽ bắt đầu bằng việc chọn một UTxO mới từ ví cá nhân của mình. UTxO này phải còn khả dụng trên Layer 1 và chưa được sử dụng trong giao dịch khác. Sau khi lựa chọn xong, người dùng thực hiện thao tác commit tương tự như lần đầu bằng cách gửi yêu cầu lên hệ thống.

Tiếp theo, transaction commit sẽ được tạo ra và gửi đến ví để người dùng ký xác nhận. Việc ký giao dịch đảm bảo rằng chỉ chủ sở hữu ví mới có quyền đưa tài sản vào Hydra Head, đồng thời duy trì tính an toàn và minh bạch trong toàn bộ quá trình.

Sau khi giao dịch được xác nhận thành công, UTxO mới sẽ được nạp thêm vào Hydra Head mà không làm gián đoạn các hoạt động đang diễn ra như tip, claim hay decommit. Điều này có nghĩa là hệ thống vẫn tiếp tục hoạt động bình thường trong khi trạng thái tài sản được mở rộng theo thời gian thực.

Cuối cùng, giao diện sẽ được cập nhật để phản ánh số dư mới trong Hydra Head, giúp người dùng dễ dàng theo dõi toàn bộ tài sản đang được sử dụng trong hệ thống một cách trực quan và liên tục.

---

💸 **7. Claim tài sản**

Khi Creator muốn nhận lại toàn bộ phần ADA đã được người dùng tip trong Hydra Head của Hydra, họ sẽ thực hiện chức năng Claim.

Quá trình bắt đầu bằng việc Creator nhấn nút “Claim” trên giao diện. Hệ thống sẽ khởi tạo một giao dịch tương ứng với logic smart contract bên trong Hydra Head, sau đó gửi yêu cầu ký lên ví của Creator.

Tại bước này, ví sẽ hiển thị thông tin giao dịch để người dùng kiểm tra và xác nhận. Sau khi ký thành công, transaction sẽ được xử lý trong Hydra, và số ADA tương ứng sẽ được chuyển về ví của Creator.

Ngay sau khi giao dịch hoàn tất, hệ thống sẽ tự động cập nhật lại giao diện, bao gồm số dư mới của Creator và trạng thái claim, đảm bảo dữ liệu hiển thị luôn đồng bộ với trạng thái thực tế trên blockchain.

---

🔙 **8. Decommit tài sản về Layer 1**

Trong trường hợp người dùng muốn rút tài sản ra khỏi Hydra Head, họ có thể sử dụng chức năng Decommit, đưa UTxO từ Layer 2 trở lại Layer 1 (Cardano mainchain).

Đầu tiên, người dùng chọn UTxO mà mình muốn rút từ danh sách tài sản đang tồn tại trong Hydra Head. Sau đó nhấn nút “Decommit” để khởi tạo quá trình rút tài sản.

Hệ thống sẽ tạo transaction decommit và gửi lên ví để người dùng ký xác nhận. Sau khi được ký thành công, transaction sẽ được xử lý theo cơ chế của Hydra và chuẩn bị đưa tài sản trở lại Layer 1.

Kết quả cuối cùng là UTxO sẽ rời khỏi Hydra Head và xuất hiện trở lại trên mainchain Cardano, cho phép người dùng tiếp tục sử dụng trong các giao dịch thông thường ngoài Layer 2.

---

🔒 **9. Close & Fanout (tuỳ chọn)**

Khi cần kết thúc một phiên làm việc của Hydra Head, người vận hành có thể thực hiện quy trình Close & Fanout.

Trước tiên, hệ thống sẽ thực hiện thao tác Close để đóng Hydra Head, ngăn không cho các giao dịch mới tiếp tục được thêm vào. Sau khi Head đã được đóng hoàn toàn, bước tiếp theo là Fanout, nhằm phân phối toàn bộ tài sản còn lại trong Hydra Head về lại các ví tương ứng trên Layer 1.

Trong thực tế, Hydra Head thường được giữ ở trạng thái mở để nhiều người dùng có thể tiếp tục tham gia và giao dịch với tốc độ cao. Chỉ khi hệ thống cần kết thúc phiên, tổng hợp kết quả hoặc reset trạng thái, quá trình Close & Fanout mới được thực hiện.

Điều này giúp đảm bảo tính linh hoạt của mô hình Layer 2, vừa hỗ trợ giao dịch nhanh trong Hydra, vừa đảm bảo an toàn và đồng bộ dữ liệu khi quay trở lại Layer 1 trên Cardano.

---

📊 **Tổng kết luồng hoạt động**

Toàn bộ hệ thống được thiết kế theo một luồng xử lý thống nhất, kết hợp giữa Frontend, Backend và Layer 2 Hydra trong Hydra, nhằm đảm bảo trải nghiệm người dùng mượt mà, tốc độ cao và tính nhất quán dữ liệu xuyên suốt.

Quy trình bắt đầu từ việc người dùng truy cập ứng dụng, hệ thống sẽ kiểm tra trạng thái kết nối ví để đảm bảo mọi thao tác đều được xác thực. Sau đó, người dùng tiến hành kết nối ví blockchain, qua đó cấp quyền truy cập và xác thực danh tính trên hệ thống.

Khi đã sẵn sàng, người dùng có thể tạo Creator mới bằng cách cung cấp các thông tin cơ bản như tiêu đề, mô tả, tác giả và hình ảnh đại diện. Creator sau khi được tạo sẽ trở thành một thực thể trung tâm trong hệ thống, có khả năng nhận tip và tham gia các hoạt động trong Hydra Head.

Tiếp theo là bước commit tài sản, nơi người dùng đưa UTxO từ Layer 1 vào Hydra Head để tham gia các giao dịch Layer 2. Đây là bước quan trọng giúp chuyển tài sản sang môi trường xử lý nhanh và hiệu quả hơn. Trong quá trình sử dụng, người dùng có thể thực hiện tip cho Creator, giúp cập nhật số dư và trạng thái giao dịch gần như tức thì.

Ngoài ra, hệ thống cũng hỗ trợ commit thêm tài sản bất kỳ lúc nào, cho phép người dùng linh hoạt mở rộng số dư trong Hydra Head mà không làm gián đoạn các hoạt động đang diễn ra. Khi Creator muốn nhận phần thưởng, họ có thể thực hiện claim để rút ADA về ví cá nhân.

Song song đó, người dùng cũng có thể decommit tài sản, tức là rút UTxO từ Hydra Head quay trở lại Layer 1 khi không còn nhu cầu sử dụng Layer 2. Trong trường hợp cần kết thúc phiên hoạt động, hệ thống hỗ trợ close và fanout, giúp đóng Hydra Head và phân phối lại toàn bộ tài sản về các ví tương ứng trên mainchain.

Tổng thể, toàn bộ luồng hoạt động tạo thành một vòng đời hoàn chỉnh: từ khởi tạo → xác thực → tham gia → giao dịch → rút về, đảm bảo tính linh hoạt, hiệu năng cao và khả năng mở rộng của hệ thống dựa trên Hydra và Cardano.

---

## 📚 Đóng gói ứng dụng bằng Docker và thực hiện build

### 1. Chuẩn bị trước khi Docker

Trước khi tiến hành đóng gói ứng dụng bằng Docker, việc chuẩn bị môi trường là bước rất quan trọng. Nếu bước này không được thực hiện đúng, quá trình build hoặc run container có thể gặp lỗi như thiếu Docker engine, sai quyền truy cập hoặc không thể chạy container.

Vì vậy, mục tiêu của bước này là đảm bảo hệ thống đã được cài đặt đầy đủ Docker và sẵn sàng để sử dụng trong các bước tiếp theo như build image, chạy container và deploy ứng dụng.

#### 📌 Cài đặt Docker

Trước tiên, cần kiểm tra xem Docker đã được cài đặt trên hệ thống hay chưa. Điều này giúp tránh việc cài đặt trùng lặp hoặc phát sinh lỗi không cần thiết.

```bash
# Kiểm tra Docker đã được cài đặt chưa
docker --version
```

👉 Nếu Docker đã được cài đặt thành công, hệ thống sẽ trả về phiên bản tương tự như: `Docker version 24.x.x, build xxxx` Điều này có nghĩa là Docker đã sẵn sàng hoạt động và bạn có thể chuyển sang các bước tiếp theo.

❗ Trường hợp chưa cài đặt Docker hoặc hệ thống báo lỗi "command not found" hoặc tương tự, điều này cho thấy Docker chưa được cài đặt hoặc không được cấu hình đúng trên hệ thống. Trong trường hợp này, bạn cần tiến hành cài đặt Docker trước khi tiếp tục với các bước đóng gói và triển khai ứng dụng. Có thể cài đặt Docker theo hướng dẫn chính thức tại [Docker Installation Guide](https://docs.docker.com/get-docker).

🚀 Cài đặt nhanh Docker trên Ubuntu / VPS. Nếu bạn đang làm việc trên VPS hoặc Linux (Ubuntu), bạn có thể cài đặt Docker nhanh bằng một lệnh duy nhất như sau:

```bash
# Cài đặt Docker trên Ubuntu
curl -fsSL https://get.docker.com | sh
```

📌 Giải thích:

- `curl`: tải script cài đặt từ internet
- `-fsSL`: đảm bảo tải an toàn, không hiển thị lỗi thừa
- `get.docker.com`: script chính thức từ Docker
- `| sh`: thực thi script cài đặt trực tiếp

Lệnh này sẽ tự động: Cài Docker Engine, Cài Docker CLI, Thiết lập các thành phần cần thiết để chạy container

#### ⚙️ Khởi động và kiểm tra Docker

Sau khi cài đặt xong, bước tiếp theo là kiểm tra lại xem Docker đã hoạt động ổn định chưa. Bạn có thể sử dụng lệnh sau để kiểm tra trạng thái của Docker:

```bash
docker --version
```

Nếu hệ thống trả về version Docker, điều đó có nghĩa là: Docker đã được cài đặt thành công và sẵn sàng để sử dụng. Bạn có thể tiếp tục với việc tạo Dockerfile, build image và chạy container để triển khai ứng dụng của mình.

#### 🧠 Lưu ý quan trọng

- Nếu dùng VPS, nên chạy Docker với quyền sudo nếu chưa cấu hình user
- Nên restart terminal hoặc SSH lại sau khi cài đặt
- Đảm bảo server có đủ quyền và dung lượng để build image (đặc biệt với project lớn như DApp)

### 2. Tạo Dockerfile

Dockerfile là thành phần cốt lõi trong quá trình Docker hóa ứng dụng. Nó đóng vai trò như một “bản hướng dẫn” để Docker biết cách xây dựng môi trường chạy ứng dụng từ đầu đến cuối.

Trong file này, chúng ta sẽ định nghĩa toàn bộ các bước như: chọn môi trường runtime, cài dependencies, build project và khởi chạy ứng dụng.

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bunx prisma generate
RUN bun run build
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "start"]

```

📌 Giải thích chi tiết từng bước

- `FROM oven/bun:latest`: Chọn base image sử dụng Bun runtime. Đây là môi trường nền để chạy ứng dụng, thay thế cho Node.js truyền thống với hiệu năng cao hơn.
- `WORKDIR /app`: Đặt thư mục làm việc trong container là `/app`. Tất cả các lệnh tiếp theo sẽ được thực thi trong thư mục này.
- `COPY package.json bun.lockb ./`: Sao chép file `package.json` và `bun.lockb` từ máy chủ vào thư mục làm việc trong container. Đây là bước quan trọng để đảm bảo các dependencies được cài đặt chính xác.
- `RUN bun install`: Chạy lệnh cài đặt dependencies được định nghĩa trong `package.json` sử dụng Bun. Điều này sẽ tạo ra thư mục `node_modules` chứa tất cả các thư viện cần thiết cho ứng dụng.
- `COPY . .`: Sao chép toàn bộ mã nguồn của ứng dụng từ máy chủ vào thư mục làm việc trong container. Điều này đảm bảo rằng tất cả các file cần thiết để chạy ứng dụng đều có mặt trong container.
- `RUN bunx prisma generate`: Chạy lệnh để tạo client Prisma từ schema. Đây là bước cần thiết nếu ứng dụng sử dụng Prisma để tương tác với cơ sở dữ liệu, đảm bảo rằng client được cập nhật với các thay đổi trong schema.
- `RUN bun run build`: Chạy lệnh build ứng dụng. Điều này sẽ biên dịch mã nguồn (nếu cần) và chuẩn bị ứng dụng để chạy trong môi trường production.
- `ENV PORT=3000`: Đặt biến môi trường `PORT` trong container thành `3000`. Điều này cho phép ứng dụng biết cổng nào để lắng nghe khi chạy.
- `EXPOSE 3000`: Mở cổng `3000` trên container để có thể nhận kết nối từ bên ngoài. Đây là cổng mà ứng dụng sẽ lắng nghe.
- `CMD ["bun", "run", "start"]`: Định nghĩa lệnh mặc định để chạy ứng dụng khi container khởi động. Lệnh này sẽ chạy ứng dụng ở chế độ production, sử dụng Bun để thực thi.

### 3. Cấu hình Docker Compose

Docker Compose là công cụ giúp quản lý và chạy nhiều container một cách dễ dàng chỉ với một file cấu hình duy nhất. Thay vì phải chạy từng lệnh Docker thủ công, chúng ta chỉ cần một lệnh docker compose up là toàn bộ hệ thống sẽ được khởi động tự động.

Trong dự án này, Docker Compose được sử dụng để quản lý container chính của ứng dụng TipJar, đồng thời thiết lập các cấu hình quan trọng như port, biến môi trường và chế độ chạy production.

```yaml
version: "3.9"

services:
    app:
        build:
            context: .
            dockerfile: Dockerfile

        container_name: tipjar
        restart: unless-stopped

        ports:
            - "3000:3000"

        env_file:
            - .env

        environment:
            - NODE_ENV=production
            - PORT=3000
```

📌 Giải thích chi tiết từng phần

- `version: "3.9"`: Xác định phiên bản của Docker Compose file. Phiên bản 3.9 là một trong những phiên bản mới nhất, hỗ trợ nhiều tính năng hiện đại.
- `services`: Đây là phần chính để định nghĩa các dịch vụ (container) mà chúng ta muốn chạy. Trong trường hợp này, chúng ta chỉ có một dịch vụ duy nhất là `app`.
- `app`: Tên của dịch vụ, có thể đặt tùy ý nhưng nên đặt sao cho dễ nhận biết. Đây sẽ là tên của container khi chạy.
- `build`: Phần này định nghĩa cách Docker sẽ build image cho dịch vụ. Chúng ta chỉ định `context` là thư mục hiện tại (.) và `dockerfile` là file Dockerfile đã tạo ở bước trước.
- `container_name: tipjar`: Đặt tên cho container khi chạy. Điều này giúp dễ dàng quản lý và nhận diện container trong quá trình vận hành.
- `restart: unless-stopped`: Thiết lập chính sách khởi động lại container. Với tùy chọn này, container sẽ tự động khởi động lại nếu bị dừng do lỗi hoặc sự cố, nhưng sẽ không khởi động lại nếu bạn chủ động dừng nó.
- `ports`: Mở cổng để kết nối từ bên ngoài vào container. Ở đây, chúng ta ánh xạ cổng 3000 của máy chủ (host) đến cổng 3000 của container, cho phép truy cập ứng dụng thông qua `localhost:3000` hoặc `IP:3000`.
- `env_file`: Chỉ định file chứa các biến môi trường. Điều này giúp tách biệt cấu hình môi trường ra khỏi file Docker Compose, làm cho việc quản lý và bảo mật thông tin nhạy cảm trở nên dễ dàng hơn.
- `environment`: Định nghĩa các biến môi trường trực tiếp trong file Docker Compose. Ở đây, chúng ta đặt `NODE_ENV` thành `production` để chạy ứng dụng ở chế độ production, và `PORT` thành `3000` để đảm bảo ứng dụng biết cổng nào để lắng nghe.

### 4. Build và run container

Sau khi đã hoàn tất Dockerfile và Docker Compose, bước tiếp theo là tiến hành build và khởi chạy container. Đây là bước quan trọng giúp biến toàn bộ source code thành một ứng dụng đang chạy trong môi trường Docker.

```bash
docker compose up --build -d
```

📌 Giải thích lệnh

- `docker compose up`: Lệnh này sẽ khởi động tất cả các dịch vụ được định nghĩa trong file `docker-compose.yml`. Nếu container chưa tồn tại, Docker sẽ tự động build image trước khi chạy.
- `--build`: Tham số này buộc Docker phải build lại image ngay cả khi đã có image cũ. Điều này rất hữu ích khi bạn đã thực hiện thay đổi trong Dockerfile hoặc source code và muốn đảm bảo rằng những thay đổi đó được áp dụng.
- `-d`: Tham số này cho phép chạy container ở chế độ detached, nghĩa là container sẽ chạy ở background và bạn có thể tiếp tục sử dụng terminal để thực hiện các lệnh khác.

🚀 Sau khi chạy lệnh trên, Docker sẽ bắt đầu quá trình build image dựa trên Dockerfile và sau đó khởi chạy container theo cấu hình đã định nghĩa trong Docker Compose. Bạn có thể kiểm tra trạng thái của container bằng lệnh:

```bash
docker ps
```

Lệnh này sẽ hiển thị danh sách các container đang chạy, bao gồm tên, trạng thái và cổng mà chúng đang lắng nghe. Nếu container `tipjar` xuất hiện trong danh sách với trạng thái "Up", điều đó có nghĩa là ứng dụng đã được triển khai thành công và đang chạy trong môi trường Docker. Bạn có thể truy cập ứng dụng thông qua `localhost:3000` hoặc `IP:3000` tùy thuộc vào cách bạn cấu hình mạng của Docker.

---

## 📚 Quản lý mã nguồn bằng Git một cách hiệu quả

Quản lý mã nguồn là một phần không thể thiếu trong quá trình phát triển phần mềm, đặc biệt khi làm việc với các dự án thực tế hoặc làm việc nhóm. Git giúp chúng ta theo dõi sự thay đổi của code, dễ dàng quay lại phiên bản trước, đồng thời hỗ trợ triển khai và cộng tác hiệu quả.

Trong phần này, chúng ta sẽ thiết lập Git cho dự án, kết nối với GitHub và thực hiện đẩy source code lên repository để phục vụ cho việc deploy và quản lý lâu dài.

### 1. Khởi tạo Git trong project

Trước tiên, cần khởi tạo Git cho project:

```bash
git init
```

Lệnh này sẽ tạo ra một repository Git mới trong thư mục hiện tại, cho phép bạn bắt đầu theo dõi các thay đổi của mã nguồn.

### 2. Thêm remote repository

Tiếp theo, bạn cần kết nối repository local với một remote repository trên GitHub để có thể đẩy code lên đó. Bạn có thể tạo một repository mới trên GitHub và sau đó sử dụng lệnh sau để thêm remote:

```bash
git remote add origin <REPO_URL>
```

Thay `<REPO_URL>` bằng URL của repository bạn vừa tạo trên GitHub. Ví dụ: `git remote add origin https://github.com/username/hydra-tipjar.git` Lệnh này sẽ thiết lập một remote có tên là `origin` trỏ đến repository trên GitHub, cho phép bạn đẩy code lên đó sau này.

### 3. Thêm và commit code

Sau khi đã thiết lập Git và kết nối với remote repository, bước tiếp theo là thêm các file vào staging area và commit chúng:

```bash
git add .
git commit -m "Initial commit"
```

- `git add .`: Thêm tất cả các file trong thư mục hiện tại vào staging area, chuẩn bị cho việc commit.
- `git commit -m "Initial commit"`: Tạo một commit mới với thông điệp "Initial commit". Đây là bước quan trọng để lưu lại trạng thái hiện tại của mã nguồn và tạo điểm khởi đầu cho lịch sử phát triển của dự án.

### 4. Đẩy code lên GitHub

Sau khi đã commit code, bạn có thể đẩy nó lên GitHub bằng lệnh:

```bash
git push -u origin main
```

- `git push`: Lệnh này sẽ đẩy các commit từ repository local lên remote repository trên GitHub.
- `-u origin main`: Tham số này thiết lập nhánh `main` trên
  remote `origin` làm nhánh theo dõi cho nhánh hiện tại trên local. Điều này có nghĩa là trong các lần push tiếp theo, bạn chỉ cần sử dụng `git push` mà không cần chỉ định remote và branch nữa.
  Sau khi chạy lệnh này, mã nguồn của bạn sẽ được đẩy lên GitHub và có thể được truy cập thông qua URL của repository. Đây là bước quan trọng để đảm bảo rằng mã nguồn của bạn được lưu trữ an toàn và có thể dễ dàng chia sẻ hoặc triển khai từ đó trong tương lai.

---

## 📚 Triển khai ứng dụng lên các nền tảng như Vercel hoặc VPS

### 1. Triển khai lên Vercel

Vercel là một nền tảng đám mây phổ biến cho việc triển khai ứng dụng web, đặc biệt là các ứng dụng frontend hoặc full-stack. Để triển khai ứng dụng lên Vercel, bạn có thể làm theo các bước sau:

- Đăng nhập hoặc tạo tài khoản trên Vercel tại [Vercel](https://vercel.com/).
- Kết nối Vercel với repository GitHub của bạn. Vercel sẽ tự
  động phát hiện các dự án và cho phép bạn chọn repository mà bạn muốn triển khai.
- Chọn branch mà bạn muốn triển khai (thường là `main` hoặc `master`).
- Cấu hình các thiết lập cần thiết như biến môi trường, cổng, v.v.
- Nhấn nút "Deploy" để bắt đầu quá trình triển khai. Vercel sẽ tự động build và deploy ứng dụng của bạn, sau đó cung cấp cho bạn một URL để truy cập ứng dụng trực tuyến.

### 2. Triển khai lên VPS

Nếu bạn muốn triển khai ứng dụng trên một VPS (Virtual Private Server), bạn có thể làm theo các bước sau:

- Đăng nhập vào VPS của bạn thông qua SSH.
- Cài đặt Docker trên VPS nếu chưa có (xem phần trước để biết cách cài đặt Docker).

- Sao chép file `docker-compose.yml` và `Dockerfile` từ máy local lên VPS. Bạn có thể sử dụng `scp` hoặc `rsync` để thực hiện việc này.

```bash
# Ví dụ sử dụng scp để sao chép file
scp docker-compose.yml user@vps_ip:/path/to/destination
scp Dockerfile user@vps_ip:/path/to/destination
```

- SSH vào VPS và điều hướng đến thư mục chứa các file đã sao chép.

```bash
ssh user@vps_ip
cd /path/to/destination
```

- Build và chạy container bằng Docker Compose.

```bash
docker compose up --build -d
```

- Kiểm tra trạng thái của container để đảm bảo ứng dụng đã được triển khai thành công.

```bash
docker ps
```

- Nếu container đang chạy, bạn có thể truy cập ứng dụng thông qua địa chỉ IP của VPS và cổng đã cấu hình (ví dụ: `http://vps_ip:3000`).

---

## 📚 Cấu hình tên miền riêng và giới thiệu sản phẩm tới cộng đồng

### 1. Cấu hình tên miền riêng

Để cấu hình tên miền riêng cho ứng dụng của bạn, bạn cần thực hiện các bước sau:

- Mua một tên miền từ nhà cung cấp tên miền như GoDaddy, Namecheap, v.v.
- Truy cập vào trang quản lý DNS của nhà cung cấp tên miền và thêm một bản ghi A hoặc CNAME trỏ đến địa chỉ IP của VPS hoặc URL của Vercel nơi ứng dụng của bạn đang chạy.
- Nếu bạn sử dụng VPS, hãy đảm bảo rằng cổng mà ứng dụng của bạn đang lắng nghe (ví dụ: 3000) được mở và có thể truy cập từ bên ngoài.
- Sau khi cập nhật DNS, có thể mất một khoảng thời gian để các thay đổi được phổ biến trên toàn cầu. Bạn có thể kiểm tra trạng thái của DNS bằng cách sử dụng các công cụ như `nslookup` hoặc `dig`.
- Khi DNS đã được cập nhật, bạn có thể truy cập ứng dụng của mình thông qua tên miền riêng mà bạn đã cấu hình. Ví dụ: `http://yourdomain.com`. Điều này giúp tăng tính chuyên nghiệp và dễ nhớ cho người dùng khi truy cập ứng dụng của bạn.

### 2. Giới thiệu sản phẩm tới cộng đồng

Sau khi ứng dụng đã được triển khai và có thể truy cập thông qua tên miền riêng, bước tiếp theo là giới thiệu sản phẩm tới cộng đồng. Bạn có thể thực hiện điều này thông qua các kênh sau:

- Mạng xã hội: Chia sẻ về ứng dụng của bạn trên các nền tảng như Twitter, Facebook, LinkedIn, v.v. Hãy tạo một bài viết hấp dẫn giới thiệu về tính năng và lợi ích của ứng dụng để thu hút sự chú ý của cộng đồng.
- Diễn đàn và nhóm cộng đồng: Tham gia vào các diễn đàn hoặc nhóm liên quan đến lĩnh vực của bạn (ví dụ: Reddit, Discord, Telegram) và chia sẻ về ứng dụng của bạn. Hãy đảm bảo rằng bạn tuân thủ các quy tắc của cộng đồng và không spam.
- Viết blog hoặc bài viết: Nếu bạn có một blog cá nhân hoặc có thể đăng bài viết trên các nền tảng như Medium, Dev.to, v.v., hãy viết một bài giới thiệu chi tiết về ứng dụng của bạn, bao gồm các tính năng chính, cách sử dụng và lợi ích mà nó mang lại cho người dùng.
- Tổ chức sự kiện hoặc webinar: Nếu ứng dụng của bạn có tính năng đặc biệt hoặc giải quyết một vấn đề cụ thể, bạn có thể tổ chức một sự kiện trực tuyến hoặc webinar để giới thiệu về ứng dụng và hướng dẫn người dùng cách sử dụng nó. Đây là cơ hội tốt để tương tác trực tiếp với cộng đồng và nhận phản hồi từ người dùng.
- Hợp tác với các influencer hoặc đối tác: Nếu có thể, hãy hợp tác với các influencer trong lĩnh vực của bạn hoặc các đối tác có liên quan để giúp quảng bá ứng dụng của bạn đến một đối tượng rộng hơn. Việc này có thể giúp tăng độ tin cậy và thu hút nhiều người dùng hơn đến với ứng dụng của bạn.

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/introduction-to-hydra-exploring-the-future-of-cardanos-layer-2-scaling-and-practical-use-cases"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/16XjWCYfsjugHwTKSeluslssTU13uLa4v/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_01"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-01/video-01"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=3rO7EuTN3t8&t=313s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
