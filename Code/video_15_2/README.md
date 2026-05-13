<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Tutorial" />

# **Kiểm thử và xác thực Hydra DApp**

**mô phỏng các kịch bản thực tế với nhiều người dùng cùng tham gia vào một Hydra Head từ smart contrac.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04+-E95420?logo=ubuntu)](https://ubuntu.com/download/server)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1+-4287D6?logo=cardano)](https://github.com/IntersectMBO/cardano-node/releases)
[![Hydra](https://img.shields.io/badge/Hydra%20Node-1.0.0+-00FF00?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family/head-protocol)
[![Aiken](https://img.shields.io/badge/Aiken-v1.1.2-7B42BC?logo=haskell)](https://aiken-lang.org)
[![Plutus](https://img.shields.io/badge/Plutus-Haskell-8A2BE2)](https://plutus.cardano.org)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT-FFBB00.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới thiệu

Trong phần này, hệ thống DApp được hoàn thiện bằng cách kết nối toàn bộ các thành phần từ Frontend, Backend đến Cardano Layer 1 và Hydra. Mục tiêu là đảm bảo dữ liệu được xử lý theo thời gian thực, giúp các thao tác như gửi transaction, cập nhật số dư hay trạng thái smart contract được phản ánh nhanh chóng và chính xác trên giao diện người dùng. Đồng thời, phần này cũng tập trung vào việc đảm bảo luồng xử lý xuyên suốt từ UI đến backend và blockchain hoạt động liền mạch, không xảy ra sai lệch dữ liệu.

Bên cạnh đó, hệ thống sẽ được kiểm thử thông qua các kịch bản thực tế với nhiều người tham gia, nhằm đánh giá khả năng xử lý đồng thời và mức độ ổn định. Việc mô phỏng các tình huống này giúp kiểm tra tính đúng đắn của logic cũng như khả năng tận dụng lợi thế của Hydra trong việc xử lý giao dịch nhanh và chi phí thấp.

---

## Mục tiêu

Mục tiêu chính của phần này là xác thực toàn bộ hệ thống DApp cả về chức năng lẫn hiệu năng. Cụ thể, cần đảm bảo các chức năng như commit, tip, claim, decommit và fanout hoạt động chính xác trong từng trạng thái của Hydra, đồng thời dữ liệu giữa các thành phần luôn được đồng bộ.

Ngoài ra, hệ thống cần được kiểm thử trong môi trường nhiều người dùng để đánh giá khả năng xử lý song song, đo lường các chỉ số như thời gian phản hồi và tốc độ xử lý giao dịch. Qua đó, chứng minh rằng ứng dụng có thể vận hành ổn định, mở rộng tốt và mang lại trải nghiệm mượt mà, tận dụng hiệu quả sức mạnh của Hydra trong việc xây dựng các DApp hiệu năng cao.

---

## Quản lý status lên giao diện

Trong phần này, việc quản lý và hiển thị trạng thái của Hydra Head trên giao diện được thực hiện thông qua hook useQuery. Đây là một cách tiếp cận hiệu quả để đồng bộ dữ liệu giữa frontend và hệ thống Hydra, đặc biệt trong các ứng dụng cần cập nhật trạng thái theo thời gian thực. Thay vì phải tự viết logic gọi API và quản lý state thủ công, useQuery giúp tự động hóa quá trình fetch dữ liệu, caching và cập nhật lại khi cần thiết.

Cụ thể, đoạn code:

```ts
const { data: headStatus, isLoading: isLoadingHeadStatus } = useQuery({
    queryKey: ["fetch-status-hydra"],
    queryFn: () => getStatus(),
});
```

được sử dụng để gọi hàm getStatus() từ backend, từ đó lấy về trạng thái hiện tại của Hydra Head. queryKey đóng vai trò định danh cho query này, giúp React Query biết khi nào cần cache hoặc refetch dữ liệu. Kết quả trả về bao gồm headStatus – chứa giá trị trạng thái (như IDLE, OPEN, CLOSED, FANOUT_POSSIBLE) và isLoadingHeadStatus – dùng để xác định xem dữ liệu có đang được tải hay không.

Sau khi có dữ liệu, trạng thái này được truyền xuống component Status để hiển thị lên giao diện:

```ts
<Status
    title="There is now a head available for you to access and below is the current state of your head"
    loading={isLoadingHeadStatus}
    data={headStatus as string}
/>
```

Component này chịu trách nhiệm hiển thị trạng thái Hydra một cách trực quan cho người dùng. Khi loading là true, UI có thể hiển thị skeleton hoặc spinner để báo hiệu đang tải dữ liệu. Khi có dữ liệu, giá trị headStatus sẽ được render ra, giúp người dùng biết chính xác hệ thống đang ở trạng thái nào.

Việc đưa trạng thái Hydra lên UI không chỉ mang ý nghĩa hiển thị, mà còn đóng vai trò định hướng hành vi người dùng. Vì hầu hết các thao tác như commit, tip, decommit hay fanout đều phụ thuộc vào trạng thái của Head, nên việc hiển thị rõ ràng giúp người dùng tránh thực hiện sai thao tác (ví dụ: cố gắng commit khi Head chưa OPEN). Đồng thời, nó cũng giúp tăng tính minh bạch của hệ thống, khi người dùng có thể theo dõi được tiến trình hoạt động của Hydra theo thời gian thực.

Tổng thể, cách tiếp cận này giúp frontend luôn đồng bộ với trạng thái thực tế của hệ thống blockchain, giảm thiểu lỗi do dữ liệu không nhất quán và cải thiện đáng kể trải nghiệm người dùng.

Trong đoạn code này, chúng ta thực hiện việc lấy danh sách UTXO từ Cardano Layer 1 và hiển thị chúng lên giao diện để người dùng lựa chọn khi thực hiện thao tác commit vào Hydra. Đây là bước quan trọng vì mỗi transaction trong mô hình UTXO đều cần chọn input cụ thể, không giống như account-based model.

Trước hết, việc lấy dữ liệu được thực hiện thông qua useQuery:

```ts
const { data: utxosCommit, isLoading: isLoadingUtxosCommit } = useQuery({
    queryKey: ["fetch-utxo-commit", address],
    queryFn: () => getUTxOsCommit({ walletAddress: address as string }),
    enabled: !!address,
});
```

Ở đây, queryKey bao gồm cả address, giúp đảm bảo mỗi khi địa chỉ ví thay đổi thì dữ liệu sẽ được refetch lại tương ứng. Hàm queryFn gọi đến getUTxOsCommit để lấy danh sách UTXO từ Layer 1. Đặc biệt, thuộc tính enabled: !!address đảm bảo rằng query chỉ được thực thi khi address tồn tại (tức là người dùng đã kết nối ví), tránh việc gọi API không cần thiết hoặc gây lỗi khi chưa có dữ liệu đầu vào hợp lệ.

Sau khi dữ liệu được trả về, danh sách UTXO sẽ được render lên UI dưới dạng các <option> trong một dropdown:

```ts
{utxosCommit?.map((utxo) => {
    return (
        <option key={`${utxo.txHash}-${utxo.outputIndex}`} value={JSON.stringify(utxo)}>
            {Number(utxo.amount) / DECIMAL_PLACE}
        </option>
    );
})}
```

Mỗi UTXO được hiển thị với một key duy nhất, kết hợp giữa txHash và outputIndex, đảm bảo không bị trùng lặp. Giá trị value của mỗi option được serialize bằng JSON.stringify(utxo), cho phép lưu toàn bộ thông tin UTXO khi người dùng chọn, từ đó có thể sử dụng lại trong các bước tiếp theo như gửi transaction.

Phần hiển thị số dư sử dụng Number(utxo.amount) / DECIMAL_PLACE để chuyển đổi từ đơn vị lovelace sang ADA, giúp người dùng dễ hiểu và dễ lựa chọn hơn. Điều này đặc biệt quan trọng vì người dùng thường không quen với đơn vị lovelace.

---

## Commit ada và tạo creator

Đoạn logic này thể hiện toàn bộ flow quan trọng khi người dùng vừa commit ADA vào Hydra Head, vừa khởi tạo một proposal (creator) trong hệ thống. Đây là một bước kết hợp giữa blockchain (Layer 1 + Hydra) và database (Prisma), đảm bảo dữ liệu on-chain và off-chain luôn đồng bộ.

```ts
const onSubmit = useCallback(
    async (data: Form) => {
        if (!address || !data.adaCommit) return;
        try {
            setLoading(true);

            const utxo = (await getUtxos()).find(
                (utxo) => utxo.input.txHash === data.adaCommit.txHash && utxo.input.outputIndex === data.adaCommit.outputIndex,
            );

            if (!utxo) {
                toast.error("Selected UTxO not found in your wallet. Please select a valid UTxO.");
                return;
            }

            const unsignTx = await commit({
                address: address as string,
                utxo: utxo,
                isCreator: true,
            });

            const signedTx = await signTx(unsignTx);
            await submitTx({ signedTx: signedTx });

            await createProposal({
                title: data.title,
                description: data.description,
                author: data.author,
                image: data.image as string,
                address: address as string,
                participants: data.participants,
            });

            toast.success("Your proposal has been successfully registered!");

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.error("An error occurred while submitting your proposal. Please try again.");
        } finally {
            setLoading(false);
        }
    },
    [address, signTx, headStatus],
);
```

Luồng xử lý bắt đầu bằng việc kiểm tra các điều kiện cơ bản như address và UTXO được chọn (data.adaCommit). Nếu thiếu một trong hai, hàm sẽ dừng ngay để tránh lỗi. Sau đó, hệ thống gọi getUtxos() để lấy danh sách UTXO hiện có trong ví và tìm đúng UTXO mà người dùng đã chọn. Bước này rất quan trọng vì đảm bảo rằng UTXO vẫn còn tồn tại và chưa bị tiêu thụ bởi transaction khác.

Khi đã xác định được UTXO hợp lệ, hàm commit sẽ được gọi để tạo transaction đưa UTXO này vào Hydra Head. Vì đây là creator, tham số isCreator: true được truyền vào để sử dụng endpoint Hydra phù hợp. Transaction lúc này vẫn chưa được ký (unsignTx), nên bước tiếp theo là gọi signTx từ ví người dùng để ký giao dịch, sau đó gửi lên Layer 1 thông qua submitTx.

Sau khi transaction được gửi thành công, hệ thống tiếp tục tạo một bản ghi mới trong database bằng createProposal. Điều này giúp lưu lại thông tin proposal tương ứng với hành động commit vừa thực hiện, đảm bảo dữ liệu off-chain (UI, backend) đồng bộ với trạng thái on-chain.

Khi tất cả hoàn tất, một thông báo thành công sẽ được hiển thị cho người dùng. Đồng thời, hệ thống gọi invalidateQueries để refetch lại các dữ liệu quan trọng như UTXO trong Hydra, UTXO có thể commit và trạng thái Hydra Head. Điều này giúp UI được cập nhật ngay lập tức, phản ánh chính xác trạng thái mới sau khi transaction hoàn thành.

Cuối cùng, khối try/catch/finally đảm bảo rằng mọi lỗi đều được xử lý và trạng thái loading luôn được reset, giúp trải nghiệm người dùng mượt mà và an toàn hơn.

---

## Hoàn thành các chức năng trong giao diện dashboard

### Commit

Trong phần này, chúng ta triển khai chức năng commit ADA vào Hydra Head trực tiếp từ giao diện tip. Đây là bước cho phép người dùng nạp tài sản từ Cardano Layer 1 vào Hydra, từ đó có thể tham gia các hoạt động như tip, claim hoặc tương tác với smart contract trong môi trường off-chain.

Trước hết, danh sách UTXO khả dụng được hiển thị dưới dạng dropdown để người dùng lựa chọn:

```ts
{utxosCommit?.map((utxo) => {
    return (
        <option key={`${utxo.txHash}-${utxo.outputIndex}`} value={JSON.stringify(utxo)}>
            {Number(utxo.amount) / DECIMAL_PLACE}
        </option>
    );
})}
```

Mỗi UTXO được biểu diễn bằng txHash và outputIndex để đảm bảo tính duy nhất. Giá trị value được serialize thành JSON để có thể sử dụng lại toàn bộ thông tin khi submit form. Phần hiển thị sử dụng phép chia với DECIMAL_PLACE để chuyển từ lovelace sang ADA, giúp người dùng dễ đọc và lựa chọn chính xác số tiền muốn commit.

Khi người dùng submit, hàm handleSubmitCommit sẽ xử lý toàn bộ logic:

```ts
const handleSubmitCommit = useCallback(
    async (data: Commit) => {
        if (!address || !data) return;
        try {
            const utxo = (await getUtxos()).find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);

            if (!utxo) {
                toast.error("Selected UTxO not found in your wallet. Please select a valid UTxO.");
                return;
            }

            const unsignTx = await commit({
                address: address as string,
                utxo: utxo,
                isCreator: false,
            });

            const signedTx = await signTx(unsignTx);
            await submitTx({ signedTx: signedTx });

            toast.success("Successfully committed to the head!");

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.error("An error occurred while submitting your proposal. Please try again.");
        }
    },
    [address, signTx],
);
```

Luồng xử lý của chức năng commit được thiết kế theo từng bước rõ ràng nhằm đảm bảo tính chính xác và an toàn khi tương tác với blockchain và Hydra. Trước hết, hệ thống kiểm tra các điều kiện đầu vào cơ bản như address (địa chỉ ví) và dữ liệu người dùng đã chọn từ form. Đây là bước quan trọng để tránh các trường hợp gọi transaction khi chưa có ví hoặc dữ liệu không hợp lệ.

Tiếp theo, hệ thống gọi hàm getUtxos() để lấy danh sách toàn bộ UTXO hiện có trong ví người dùng. Từ danh sách này, nó sẽ tìm chính xác UTXO mà người dùng đã chọn dựa trên txHash và outputIndex. Việc xác thực lại UTXO ở bước này là rất cần thiết, bởi trong môi trường blockchain, một UTXO có thể đã bị tiêu thụ bởi transaction khác nếu người dùng thao tác nhiều lần hoặc có nhiều tab hoạt động song song. Nếu không kiểm tra lại, transaction có thể bị fail do sử dụng input không còn hợp lệ.

Khi đã xác định được UTXO hợp lệ, hệ thống sẽ tiến hành tạo transaction commit bằng cách gọi hàm commit. Ở đây, tham số isCreator được đặt là false vì người dùng chỉ tham gia vào Hydra Head, không phải là người khởi tạo. Hàm commit sẽ xây dựng một transaction phù hợp để đưa UTXO từ Layer 1 vào trong Hydra Head, nhưng ở thời điểm này transaction vẫn chưa được ký.

Do đó, bước tiếp theo là sử dụng hàm signTx để người dùng ký transaction bằng ví của họ. Đây là bước bắt buộc trong mọi giao dịch blockchain nhằm đảm bảo quyền sở hữu và xác thực rằng chính người dùng đang thực hiện hành động này. Sau khi transaction đã được ký, hệ thống gọi submitTx để gửi transaction lên Cardano Layer 1. Tại đây, transaction sẽ được xử lý và xác nhận trên blockchain, chính thức đưa UTXO vào Hydra.

Sau khi toàn bộ quá trình hoàn tất thành công, hệ thống hiển thị thông báo (toast) để phản hồi lại cho người dùng rằng thao tác commit đã được thực hiện thành công. Tuy nhiên, một bước quan trọng không kém là cập nhật lại dữ liệu trên giao diện. Thay vì reload toàn bộ trang, hệ thống sử dụng invalidateQueries của React Query để refetch lại các nguồn dữ liệu liên quan, bao gồm: danh sách UTXO trong Hydra, danh sách UTXO còn có thể commit và trạng thái hiện tại của Hydra Head.

Việc refetch này giúp giao diện được cập nhật ngay lập tức theo trạng thái mới nhất của hệ thống. Ví dụ, UTXO vừa commit sẽ không còn xuất hiện trong danh sách có thể chọn nữa, đồng thời sẽ xuất hiện trong danh sách UTXO của Hydra. Trạng thái Head cũng có thể thay đổi (ví dụ từ IDLE sang OPEN), và tất cả những thay đổi này đều được phản ánh tức thì lên UI.

Tổng thể, luồng xử lý này đảm bảo rằng mọi thao tác của người dùng đều được kiểm soát chặt chẽ, từ xác thực dữ liệu đầu vào, xử lý transaction cho đến đồng bộ lại trạng thái hệ thống. Điều này không chỉ giúp tránh lỗi mà còn mang lại trải nghiệm mượt mà, minh bạch và đáng tin cậy khi sử dụng DApp.

### Increment Commit

Chức năng Increment Commit cho phép người dùng tiếp tục nạp thêm UTXO vào Hydra Head sau khi đã tham gia trước đó. Đây là một đặc điểm quan trọng của Hydra, giúp người dùng linh hoạt tăng số dư trong môi trường off-chain mà không cần khởi tạo lại từ đầu.

Trước hết, danh sách UTXO khả dụng vẫn được hiển thị dưới dạng dropdown để người dùng lựa chọn:

```ts
{utxosCommit?.map((utxo) => {
    return (
        <option key={`${utxo.txHash}-${utxo.outputIndex}`} value={JSON.stringify(utxo)}>
            {Number(utxo.amount) / DECIMAL_PLACE}
        </option>
    );
})}
```

Danh sách này bao gồm các UTXO chưa được sử dụng, cho phép người dùng chọn thêm tài sản để commit. Việc hiển thị số lượng ADA (sau khi convert từ lovelace) giúp người dùng dễ dàng quyết định số tiền muốn nạp thêm.

Khi người dùng submit, hàm handleSubmitCommit sẽ xử lý toàn bộ luồng logic:

```ts
const handleSubmitCommit = useCallback(
    async (data: Commit) => {
        if (!address || !data) return;
        try {
            const utxo = (await getUtxos()).find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);

            if (!utxo) {
                toast.error("Selected UTxO not found in your wallet. Please select a valid UTxO.");
                return;
            }

            const unsignTx = await commit({
                address: address as string,
                utxo: utxo,
                isCreator: false,
            });

            const signedTx = await signTx(unsignTx);
            await submitTx({ signedTx: signedTx });

            toast.success("Successfully committed to the head!");

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.error("An error occurred while submitting your proposal. Please try again.");
        }
    },
    [address, signTx],
);
```

Luồng xử lý của Increment Commit được thiết kế theo từng bước chặt chẽ nhằm đảm bảo tính chính xác khi tương tác với blockchain và Hydra. Trước hết, hệ thống tiến hành kiểm tra các điều kiện đầu vào như address và dữ liệu UTXO mà người dùng chọn. Đây là bước “gác cổng” quan trọng để tránh việc thực hiện transaction khi thiếu thông tin cần thiết hoặc dữ liệu không hợp lệ.

Sau đó, hệ thống gọi getUtxos() để lấy danh sách UTXO mới nhất từ ví người dùng. Việc lấy lại dữ liệu tại thời điểm submit (thay vì dùng dữ liệu cũ trên UI) giúp đảm bảo tính fresh data trong môi trường blockchain. Từ danh sách này, hệ thống sẽ tìm đúng UTXO dựa trên txHash và outputIndex mà người dùng đã chọn. Bước xác thực này rất quan trọng vì trong mô hình UTXO, một output chỉ có thể được sử dụng một lần. Nếu UTXO đã bị tiêu thụ bởi một transaction khác (ví dụ do người dùng thao tác nhiều lần hoặc có nhiều session), transaction hiện tại sẽ thất bại. Việc kiểm tra lại giúp tránh lỗi ngay từ phía client và cải thiện trải nghiệm người dùng.

Khi đã xác định được UTXO hợp lệ, hệ thống sẽ gọi hàm commit để tạo transaction đưa UTXO này vào Hydra Head. Vì đây không phải là lần đầu tham gia mà là nạp thêm tài sản, nên được gọi là incremental commit. Trong bối cảnh này, Hydra sẽ xử lý transaction như một lần “deposit bổ sung”, tức là cộng thêm giá trị UTXO mới vào trạng thái hiện tại của người dùng trong Head, thay vì khởi tạo lại từ đầu.

Transaction sau khi được tạo vẫn ở dạng chưa ký (unsigned). Do đó, bước tiếp theo là sử dụng signTx để người dùng ký transaction bằng ví của mình. Đây là bước bắt buộc để xác nhận quyền sở hữu UTXO và đảm bảo tính bảo mật. Sau khi ký xong, transaction được gửi lên Cardano Layer 1 thông qua submitTx. Khi transaction được xác nhận trên blockchain, UTXO tương ứng sẽ chính thức được chuyển vào Hydra, và số dư của người dùng trong môi trường off-chain sẽ tăng lên.

Sau khi hoàn tất toàn bộ quá trình, hệ thống hiển thị thông báo thành công để phản hồi lại cho người dùng. Tuy nhiên, để đảm bảo giao diện luôn phản ánh đúng trạng thái mới nhất, hệ thống tiếp tục gọi invalidateQueries của React Query để refetch lại các dữ liệu quan trọng. Cụ thể:

Danh sách UTXO có thể commit sẽ được cập nhật lại, loại bỏ UTXO vừa sử dụng
Danh sách UTXO trong Hydra sẽ được cập nhật, phản ánh số dư mới
Trạng thái Hydra Head sẽ được làm mới nếu có thay đổi

Nhờ cơ chế này, UI không cần reload toàn bộ trang nhưng vẫn đảm bảo đồng bộ hoàn toàn với trạng thái thực tế của hệ thống. Người dùng có thể ngay lập tức thấy được kết quả của hành động vừa thực hiện, từ đó tạo ra trải nghiệm mượt mà và đáng tin cậy.

Tổng thể, luồng xử lý này không chỉ đảm bảo tính đúng đắn về mặt kỹ thuật mà còn tối ưu trải nghiệm người dùng, đặc biệt trong các ứng dụng blockchain nơi trạng thái có thể thay đổi liên tục và cần được phản ánh chính xác theo thời gian thực.

### Decommit

Chức năng Decommit cho phép người dùng rút tài sản từ Hydra Head về lại Cardano Layer 1. Đây là bước quan trọng trong vòng đời của Hydra, giúp đồng bộ lại tài sản từ môi trường off-chain về blockchain chính.

Trước hết, hệ thống cần lấy danh sách UTXO hiện có trong Hydra của người dùng:

```ts
const { data: utxosFromHydra, isLoading: isLoadingUtxosFromHydra } = useQuery({
    queryKey: ["fetch-utxo-hydra", address],
    queryFn: () => getUTxOsFromHydra(address as string),
    enabled: !!address,
});
```

Đoạn code này sử dụng React Query để fetch dữ liệu từ Hydra node. Khi người dùng đã kết nối ví (address tồn tại), hệ thống sẽ gọi getUTxOsFromHydra để lấy danh sách UTXO trong Head. Đây chính là nguồn tài sản mà người dùng có thể rút ra.

Sau khi có dữ liệu, danh sách UTXO được hiển thị dưới dạng dropdown:

```ts
{utxosFromHydra?.map((utxo) => {
    return (
        <option
            key={`${utxo.input.txHash}-${utxo.input.outputIndex}`}
            value={JSON.stringify({
                txHash: utxo.input.txHash,
                outputIndex: utxo.input.outputIndex,
                amount: utxo.output.amount.find((u) => u.unit === "lovelace")?.quantity,
            })}
        >
            {Number(utxo.output.amount.find((u) => u.unit === "lovelace")?.quantity)}
        </option>
    );
})}
```

Mỗi UTXO được hiển thị dựa trên txHash và outputIndex để đảm bảo tính duy nhất. Giá trị value chứa thông tin cần thiết để thực hiện decommit, trong khi phần hiển thị cho người dùng thấy số lượng ADA tương ứng.

Khi người dùng submit, hàm handleSubmitDecommit sẽ thực hiện toàn bộ luồng xử lý:

```ts
const handleSubmitDecommit = useCallback(
    async (data: Decommit) => {
        if (!address || !data) return;
        try {
            const utxo = utxosFromHydra?.find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);

            if (!utxo) {
                toast.error("Selected UTxO not found in Hydra. Please select a valid UTxO.");
            }

            const unsignedTx = await decommit({
                address: address as string,
                utxo: utxo as UTxO,
                isCreator: false,
            });

            const signedTx = await signTx(unsignedTx);

            await publishDecommit({
                address: address as string,
                signedTx,
                isCreator: false,
            });

            toast.success("Successfully decommitted from the head!");

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.error("An error occurred while submitting your proposal. Please try again.");
        }
    },
    [address, signTx, utxosFromHydra, queryClient],
);
```

Luồng xử lý của chức năng Decommit được xây dựng nhằm đảm bảo việc rút tài sản từ Hydra Head về Layer 1 diễn ra một cách an toàn, nhất quán và đúng trạng thái của hệ thống Hydra. Trước hết, hệ thống thực hiện kiểm tra các điều kiện đầu vào cơ bản như address và dữ liệu mà người dùng đã chọn từ giao diện. Đây là bước khởi tạo quan trọng nhằm đảm bảo rằng chỉ những yêu cầu hợp lệ mới được xử lý tiếp, tránh việc tạo transaction khi thiếu thông tin hoặc dữ liệu không đầy đủ.

Sau đó, hệ thống tiến hành tìm lại UTXO trong danh sách utxosFromHydra. Việc không sử dụng trực tiếp dữ liệu từ UI mà xác thực lại từ nguồn dữ liệu mới nhất giúp đảm bảo tính chính xác trong môi trường blockchain, nơi trạng thái có thể thay đổi liên tục. Hydra là một hệ thống đa người dùng, vì vậy UTXO có thể đã bị thay đổi trạng thái hoặc bị ảnh hưởng bởi các participant khác. Do đó, bước xác thực này giúp đảm bảo rằng UTXO vẫn đang tồn tại hợp lệ trong Hydra Head tại thời điểm thực hiện giao dịch.

Khi UTXO đã được xác nhận hợp lệ, hệ thống sẽ gọi hàm decommit để bắt đầu quá trình tạo transaction rút tài sản. Transaction được xây dựng ở trạng thái unsigned, tức là chưa được ký bởi người dùng. Điều này tuân theo mô hình bảo mật của blockchain, nơi mọi hành động liên quan đến tài sản đều cần chữ ký xác thực từ chủ sở hữu.

Tiếp theo, người dùng sẽ ký transaction thông qua hàm signTx. Đây là bước bắt buộc để xác nhận quyền sở hữu và đảm bảo rằng không có bên thứ ba nào có thể thực hiện hành vi rút tài sản thay mặt người dùng. Sau khi transaction được ký thành công, thay vì gửi trực tiếp lên Layer 1 như các transaction thông thường, hệ thống sử dụng publishDecommit.

publishDecommit đóng vai trò như một cơ chế bridge giữa Hydra và Layer 1, giúp đưa transaction từ môi trường off-chain của Hydra ra blockchain chính. Khi transaction này được publish và xác nhận trên mạng lưới Cardano, tài sản của người dùng sẽ chính thức được rút khỏi Hydra và quay trở lại Layer 1.

Cuối cùng, hệ thống hiển thị thông báo thành công để phản hồi cho người dùng và thực hiện invalidateQueries nhằm đồng bộ lại toàn bộ dữ liệu trên giao diện. Cơ chế này đảm bảo UI luôn phản ánh đúng trạng thái thực tế của hệ thống mà không cần reload trang. Cụ thể, các thay đổi bao gồm:

- UTXO vừa decommit sẽ bị loại khỏi danh sách Hydra
- Tài sản có thể xuất hiện lại trên Layer 1 và sẵn sàng cho các thao tác tiếp theo như commit
- Trạng thái Hydra Head được cập nhật nếu có sự thay đổi sau giao dịch

Tổng thể, luồng xử lý này không chỉ đảm bảo tính chính xác về mặt kỹ thuật mà còn duy trì sự đồng bộ giữa Layer 1 và Hydra, giúp người dùng có trải nghiệm liền mạch khi di chuyển tài sản giữa hai môi trường on-chain và off-chain.

### Claim

Chức năng Claim được xây dựng nhằm cho phép người dùng rút hoặc nhận lại phần tài sản phát sinh từ logic smart contract bên trong Hydra Head của Hydra. Đây là một bước quan trọng trong các use case như nhận thưởng, nhận tip hoặc kết thúc một phiên giao dịch trong DApp.

```ts
const onClaim = useCallback(async () => {
    if (!address) {
        toast.error("Please connect your wallet");
        return;
    }
    try {
        setIsLoadingClaim(true);
        const unsignedTx = await claim({ address: address as string, isCreator: true });
        const signedTx = await signTx(unsignedTx);
        await submitHydraTx({ address: address as string, signedTx, isCreator: true });
        toast.success("Claim completed successfully!");
        await Promise.allSettled([
            queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
            queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
            queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
        ]);
    } catch (error) {
        toast.success("Claim completed successfully!");
    } finally {
        setIsLoadingClaim(false);
    }
}, [address, signTx, queryClient]);
```

Luồng xử lý bắt đầu bằng việc kiểm tra điều kiện cơ bản là address. Nếu người dùng chưa kết nối ví, hệ thống sẽ hiển thị thông báo lỗi và dừng toàn bộ quá trình để tránh thực hiện transaction không hợp lệ. Sau khi xác thực ví hợp lệ, trạng thái isLoadingClaim được bật lên để hiển thị trạng thái loading trên giao diện, giúp người dùng biết rằng hệ thống đang xử lý giao dịch.

Tiếp theo, hệ thống gọi hàm claim để tạo một transaction dạng unsigned transaction. Trong bước này, logic của smart contract trong Hydra sẽ được kích hoạt để xác định số tài sản mà người dùng có quyền nhận lại. Đặc biệt, tham số isCreator: true cho biết đây là người tạo hoặc người có quyền chính trong contract, từ đó quyết định logic claim tương ứng.

Sau khi transaction được tạo, người dùng tiến hành ký transaction thông qua hàm signTx. Đây là bước xác thực quan trọng nhằm đảm bảo rằng chỉ chủ sở hữu ví mới có thể thực hiện hành động claim tài sản. Khi transaction đã được ký thành công, hệ thống sử dụng submitHydraTx để gửi transaction vào Hydra network thay vì Layer 1. Điều này giúp quá trình xử lý diễn ra nhanh hơn đáng kể nhờ đặc tính off-chain của Hydra.

Khi transaction được submit thành công, hệ thống hiển thị thông báo “Claim completed successfully!” để phản hồi kết quả cho người dùng. Đồng thời, invalidateQueries được gọi để làm mới toàn bộ dữ liệu liên quan, bao gồm danh sách UTXO trong Hydra, danh sách UTXO có thể commit và trạng thái hiện tại của Hydra Head. Cơ chế này đảm bảo giao diện luôn đồng bộ với trạng thái thực tế của hệ thống mà không cần reload trang.

Cuối cùng, dù quá trình thành công hay gặp lỗi, isLoadingClaim vẫn được reset về false trong finally block để đảm bảo UI không bị treo trạng thái loading. Điều này giúp trải nghiệm người dùng luôn ổn định và nhất quán trong suốt quá trình thực hiện claim.

### Lấy lịch sử Tip

Chức năng lấy lịch sử Tip được xây dựng nhằm giúp người dùng theo dõi các giao dịch gần nhất diễn ra trong Hydra Head, đặc biệt là các hoạt động tip được thực hiện theo thời gian thực trong môi trường off-chain của Hydra. Đây là một phần quan trọng giúp tăng tính minh bạch và cải thiện trải nghiệm người dùng khi tương tác với DApp.

Trước hết, hệ thống sử dụng React Query để truy vấn dữ liệu lịch sử tip:

```ts
const { data: recents, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["fetch-recent-hydra"],
    queryFn: () => getRecent({ address: params.address as string }),
});
```

Trong đoạn code này, queryKey được dùng để định danh cache của React Query, đảm bảo dữ liệu lịch sử tip được quản lý và có thể tái sử dụng hiệu quả. Hàm getRecent sẽ nhận vào address của người dùng và thực hiện truy vấn dữ liệu từ Hydra, cụ thể là đọc các UTXO hoặc transaction gần nhất có liên quan đến hoạt động tip. Khi dữ liệu đang được tải, biến isLoadingRecent sẽ được bật để hiển thị trạng thái loading trong UI.

Điểm quan trọng trong cơ chế này là việc dữ liệu được lấy trực tiếp từ Hydra thay vì chỉ từ Layer 1, giúp phản ánh chính xác các giao dịch diễn ra gần như theo thời gian thực trong môi trường off-chain.

Sau khi dữ liệu được truy vấn thành công, UI sẽ hiển thị danh sách lịch sử tip thông qua component Recent:

```ts
<div className="space-y-6 flex flex-col">
    <Recent recents={recents!} isLoading={isLoadingRecent} />
</div>
```

Component Recent chịu trách nhiệm hiển thị toàn bộ danh sách giao dịch gần đây, bao gồm thông tin như người gửi, số tiền tip, thời gian giao dịch và trạng thái xử lý. Khi dữ liệu chưa sẵn sàng, trạng thái loading sẽ được hiển thị để đảm bảo trải nghiệm người dùng không bị gián đoạn.

Luồng xử lý tổng thể của tính năng này khá đơn giản nhưng hiệu quả: hệ thống truy vấn dữ liệu từ Hydra → cache bằng React Query → truyền vào component hiển thị → cập nhật UI theo thời gian thực. Nhờ đó, người dùng có thể dễ dàng theo dõi các hoạt động tip mới nhất mà không cần refresh trang.

Tính năng này không chỉ giúp minh bạch hóa các giao dịch trong DApp mà còn tận dụng tối đa ưu điểm của Hydra trong việc xử lý dữ liệu nhanh, liên tục và gần như tức thì so với Layer 1 truyền thống.

### Lấy lịch sử withdraw

Chức năng lấy lịch sử withdraw được xây dựng nhằm giúp người dùng theo dõi toàn bộ các giao dịch rút tiền từ Hydra về Layer 1 của Hydra. Đây là một phần quan trọng trong việc minh bạch hóa dòng tiền, đồng thời giúp người dùng dễ dàng kiểm soát các giao dịch đã được xử lý trên blockchain.

Trước hết, component Withdraw được khởi tạo trong giao diện với địa chỉ ví của người dùng:

```ts
 <Withdraw walletAddress={params.address as string} />
```

Việc truyền walletAddress vào component giúp hệ thống xác định chính xác người dùng nào đang cần truy vấn lịch sử withdraw, từ đó đảm bảo dữ liệu được lấy đúng phạm vi và không bị nhầm lẫn giữa các ví khác nhau.

```ts
const [page, setPage] = useState(1);
const { data, isLoading, error } = useQuery({
    queryKey: ["Withdraw", walletAddress, page],
    queryFn: () => getWithdraw({ walletAddress: walletAddress, page: page, limit: 6 }),
});
const formatAmount = (amount: string | null): string => {
    if (!amount) return "0.00 ADA";
    return `${(parseInt(amount) / 1_000_000).toFixed(2)} ADA`;
};

const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
```

Chức năng lấy lịch sử withdraw được xây dựng nhằm giúp người dùng theo dõi toàn bộ các giao dịch rút tiền từ Hydra về Layer 1, đảm bảo tính minh bạch và khả năng kiểm soát tài sản trong suốt quá trình sử dụng DApp trên Hydra. Hệ thống bắt đầu bằng việc khởi tạo state page để quản lý phân trang, giúp giới hạn số lượng transaction hiển thị trên mỗi lần truy vấn và tránh việc tải toàn bộ dữ liệu một lúc gây ảnh hưởng đến hiệu năng giao diện.

Tiếp theo, React Query được sử dụng để thực hiện việc fetch dữ liệu lịch sử withdraw theo từng trang. Query được định danh bằng queryKey bao gồm walletAddress và page nhằm đảm bảo cơ chế cache hoạt động chính xác theo từng người dùng và từng trang dữ liệu. Hàm getWithdraw sẽ được gọi để lấy dữ liệu từ backend, nơi thường kết nối với blockchain indexer hoặc Blockfrost API để truy xuất danh sách các giao dịch withdraw tương ứng với địa chỉ ví. Việc sử dụng limit giúp giới hạn số lượng bản ghi trả về, tối ưu hiệu năng tải và cải thiện trải nghiệm người dùng.

Sau khi dữ liệu được trả về, hệ thống tiến hành xử lý và định dạng lại để hiển thị cho người dùng. Giá trị amount được chuyển từ đơn vị lovelace sang ADA bằng cách chia cho 1.000.000, sau đó định dạng lại với hai chữ số thập phân để dễ đọc và thống nhất trong UI. Đồng thời, timestamp từ blockchain (dạng Unix time) cũng được chuyển đổi sang định dạng ngày giờ dễ hiểu bằng cách nhân với 1000 để phù hợp với chuẩn JavaScript Date, sau đó format theo kiểu ngày/tháng/năm kèm giờ và phút.

Toàn bộ luồng xử lý của chức năng withdraw hoạt động theo mô hình: người dùng truy cập giao diện → frontend gửi request thông qua React Query → backend truy vấn dữ liệu từ blockchain → trả về danh sách giao dịch → frontend xử lý format dữ liệu và hiển thị lên UI. Nhờ cơ chế phân trang và caching, hệ thống đảm bảo hiệu năng ổn định ngay cả khi số lượng giao dịch lớn.

Tổng thể, chức năng này không chỉ giúp người dùng theo dõi lịch sử rút tiền một cách rõ ràng mà còn đóng vai trò quan trọng trong việc đảm bảo tính minh bạch và khả năng kiểm soát dòng tiền giữa Hydra và Layer 1 trong toàn bộ hệ thống.

### Close & Fanout

Chức năng Close & Fanout được thiết kế nhằm kết thúc vòng đời của một Hydra Head và phân phối lại toàn bộ tài sản về Layer 1 trong hệ thống Hydra. Đây là bước cuối cùng trong quy trình vận hành Hydra, đảm bảo rằng tất cả trạng thái off-chain được đồng bộ trở lại blockchain chính một cách an toàn và nhất quán.

```ts
const onFanout = useCallback(async () => {
    if (!address) {
        toast.error("Please connect your wallet");
        return;
    }
    try {
        setIsLoadingFanout(true);
        await deleteProposal(address as string);
        await fanout({ address: address as string, isCreator: true });
        toast.success("Fanout complete sucessfully");

        await Promise.allSettled([
            queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
            queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
            queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
        ]);
    } catch (error) {
        toast.success("Fanout complete sucessfully");
    } finally {
        setIsLoadingFanout(false);
    }
}, [address, signTx, queryClient]);
```

Luồng xử lý bắt đầu bằng việc kiểm tra điều kiện cơ bản là address. Nếu người dùng chưa kết nối ví, hệ thống sẽ hiển thị thông báo lỗi và dừng toàn bộ quá trình để tránh thực hiện các thao tác không hợp lệ trên Hydra Head. Khi điều kiện hợp lệ, trạng thái isLoadingFanout được bật lên nhằm hiển thị trạng thái loading trên giao diện, giúp người dùng biết rằng hệ thống đang thực hiện quá trình đóng Head và phân phối tài sản.

Tiếp theo, hệ thống thực hiện một bước quan trọng là xóa dữ liệu proposal liên quan đến địa chỉ ví hiện tại thông qua hàm deleteProposal(address). Việc này đảm bảo rằng toàn bộ dữ liệu liên quan đến phiên làm việc trong Hydra Head được làm sạch trước khi tiến hành fanout, tránh tình trạng dữ liệu cũ tồn tại sau khi Head đã đóng.

Sau đó, hàm fanout được gọi với tham số isCreator: true. Đây là thao tác chính trong quy trình, chịu trách nhiệm đóng Hydra Head và phân phối toàn bộ tài sản còn lại từ môi trường off-chain về Layer 1. Trong quá trình này, hệ thống sẽ kiểm tra trạng thái hiện tại của Hydra Head (ví dụ OPEN hoặc FANOUT_POSSIBLE) để quyết định hành động phù hợp, đảm bảo quy trình đóng Head diễn ra đúng theo state machine của Hydra.

Khi quá trình fanout hoàn tất, hệ thống hiển thị thông báo “Fanout complete successfully” để phản hồi kết quả cho người dùng. Đồng thời, invalidateQueries được gọi để làm mới toàn bộ dữ liệu liên quan, bao gồm:

- Danh sách UTXO trong Hydra
- Danh sách UTXO có thể commit
- Trạng thái Hydra Head

Việc refresh dữ liệu này giúp giao diện phản ánh chính xác trạng thái mới sau khi Hydra Head đã được đóng và tài sản đã được đưa trở lại Layer 1.

Cuối cùng, dù quá trình thành công hay gặp lỗi, trạng thái isLoadingFanout luôn được reset về false trong khối finally. Điều này đảm bảo UI không bị kẹt ở trạng thái loading và giữ trải nghiệm người dùng luôn ổn định.

Tổng thể, Close & Fanout là bước quan trọng nhất trong vòng đời Hydra Head, đóng vai trò kết thúc phiên giao dịch off-chain và đảm bảo toàn bộ tài sản được đồng bộ chính xác về blockchain chính, hoàn thiện chu trình hoạt động của hệ thống.

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
