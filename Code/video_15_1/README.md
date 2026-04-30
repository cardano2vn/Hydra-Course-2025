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

## Hiển thị danh sách creator

Trong phần này, chúng ta xây dựng giao diện hiển thị danh sách các creator (proposal) đã được tạo trong hệ thống. Dữ liệu này được lấy từ backend (Prisma) nhưng lại gắn chặt với các hành động on-chain/off-chain trên Hydra, vì mỗi proposal thường tương ứng với một creator đã thực hiện commit vào Hydra.

Trước hết, hệ thống sử dụng useState để quản lý phân trang và useWallet để lấy địa chỉ ví hiện tại:

```ts
const [page, setPage] = useState(1);
const { address } = useWallet();
```

Biến page giúp theo dõi trang hiện tại, trong khi address được dùng để lọc dữ liệu (ví dụ: loại bỏ proposal của chính người dùng nếu cần). Sau đó, dữ liệu được fetch thông qua useQuery:

```ts
const { data, isLoading, error } = useQuery({
    queryKey: ["proposals", page, address],
    queryFn: async () =>
        getAllProposals({
            page: page,
            limit: 6,
            address: address || "",
        }),
});
```

Ở đây, queryKey phụ thuộc vào cả page và address, giúp React Query tự động refetch khi người dùng chuyển trang hoặc đổi ví. Hàm getAllProposals sẽ trả về danh sách proposal kèm theo tổng số trang, phục vụ cho việc phân trang.

Sau khi có dữ liệu, danh sách proposal được render ra UI thông qua .map():

```ts
{data?.data.map((result, index) => (
    <motion.div
        key={result.address || index}
        className="rounded-xl border border-blue-100 bg-white shadow-lg dark:border-blue-900/30 dark:bg-slate-900/80"
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
    >
        <Tipper
            image={result.image || images.logo}
            title={result.title || "Untitled Proposal"}
            author={result.author || "Unknown Author"}
            slug={result.address || ""}
            datetime={new Date(Number(result.createdAt || Date.now())).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}
            participants={2}
        />
    </motion.div>
))}
```

Mỗi proposal được hiển thị dưới dạng một card (Tipper component), bao gồm các thông tin như hình ảnh, tiêu đề, tác giả, thời gian tạo và số lượng người tham gia. Việc sử dụng motion.div (Framer Motion) giúp tạo animation mượt mà khi render (fade + slide) và hiệu ứng hover (phóng to nhẹ), từ đó cải thiện trải nghiệm người dùng.

Ngoài ra, dữ liệu cũng được xử lý fallback để tránh lỗi UI, ví dụ: nếu thiếu title hoặc author thì sẽ hiển thị giá trị mặc định. Thời gian createdAt được format lại để dễ đọc hơn.

Cuối cùng là phần phân trang:

```ts
{(data?.totalPages ?? 0) > 1 && (
    <motion.div
        className="mt-12 flex justify-center"
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
    >
        <Pagination
            currentPage={page}
            totalPages={data?.totalPages as number}
            setCurrentPage={setPage}
        />
    </motion.div>
)}
```

Phần này chỉ hiển thị khi có nhiều hơn 1 trang dữ liệu. Component Pagination cho phép người dùng chuyển trang, và khi page thay đổi, useQuery sẽ tự động gọi lại API để lấy dữ liệu mới. Animation cũng được áp dụng để giữ trải nghiệm nhất quán với phần danh sách.

---

## Hoàn thành các chức năng trong giao diện tip

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

### Tip

Luồng xử lý của chức năng Tip trong Hydra được xây dựng nhằm hỗ trợ người dùng gửi giá trị ADA cho nhau theo cơ chế gần như real-time trong môi trường off-chain của Hydra. Toàn bộ quá trình được tối ưu để đảm bảo tốc độ xử lý nhanh, đồng thời vẫn giữ được tính an toàn và nhất quán của giao dịch.

```ts
const onSubmitSend = useCallback(
    async function (data: TipForm) {
        try {
            if (!tipAddress) {
                toast.error("Invalid tip address. Please check and try again.");
                return;
            }
            if (!data.amount || data.amount <= 0) {
                toast.error("Please enter a valid tip amount greater than 0.");
                return;
            }

            const unsignedTx = await tip({
                address: address as string,
                tipAddress: tipAddress as string,
                amount: data.amount * DECIMAL_PLACE,
                isCreator: false,
            });
            const signedTx = await signTx(unsignedTx);
            await submitHydraTx({ address: address as string, signedTx, isCreator: false });
            toast.success("Tip sent successfully!");
            resetTip();

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.success("Tip sent successfully!");
            resetTip();
        }
    },
    [address, signTx, tipAddress, queryClient],
);
```

Trước hết, khi người dùng thực hiện thao tác gửi tip, hệ thống sẽ kiểm tra các điều kiện đầu vào cơ bản. Cụ thể, tipAddress phải tồn tại và hợp lệ, nếu không hệ thống sẽ hiển thị thông báo lỗi và dừng luồng xử lý. Tiếp theo, số tiền tip (data.amount) cũng được kiểm tra để đảm bảo lớn hơn 0. Đây là bước quan trọng nhằm tránh các giao dịch rỗng hoặc không hợp lệ được gửi đi, giúp giảm thiểu lỗi không cần thiết trong quá trình xử lý transaction.

Sau khi dữ liệu đầu vào hợp lệ, hệ thống tiến hành tạo transaction bằng cách gọi hàm tip. Trong bước này, số lượng ADA được chuyển đổi từ đơn vị ADA sang lovelace thông qua phép nhân với DECIMAL_PLACE. Transaction được tạo ở trạng thái chưa ký (unsigned transaction), theo đúng cơ chế bảo mật của blockchain.

Tiếp theo, người dùng sẽ ký transaction thông qua hàm signTx. Việc ký này đảm bảo rằng chính chủ sở hữu ví là người thực hiện hành động gửi tip, đồng thời xác thực quyền sử dụng tài sản trong giao dịch. Sau khi transaction được ký thành công, hệ thống gọi submitHydraTx để gửi transaction vào Hydra network thay vì Layer 1. Điều này giúp giao dịch được xử lý nhanh hơn nhiều so với blockchain truyền thống, tận dụng đặc điểm hiệu năng cao của Hydra khi xử lý các giao dịch off-chain.

Ngay sau khi transaction được submit thành công, hệ thống hiển thị thông báo “Tip sent successfully!” để phản hồi lại cho người dùng. Đồng thời, form nhập tip được reset về trạng thái ban đầu nhằm chuẩn bị cho các giao dịch tiếp theo.

Cuối cùng, hệ thống thực hiện invalidateQueries để đồng bộ lại toàn bộ dữ liệu liên quan. Cụ thể:

- Danh sách UTXO trong Hydra được cập nhật lại
- Danh sách UTXO có thể commit được làm mới
  Trạng thái Hydra Head được refetch để đảm bảo tính chính xác

Điều này giúp giao diện luôn phản ánh đúng trạng thái mới nhất của hệ thống mà không cần tải lại trang.

Tổng thể, luồng Tip trong Hydra mang lại trải nghiệm gần như tức thời cho người dùng: kiểm tra dữ liệu → tạo transaction → ký → gửi vào Hydra → cập nhật UI. Đây là một trong những use case tiêu biểu thể hiện sức mạnh của Hydra trong việc xử lý giao dịch tốc độ cao và chi phí thấp so với Layer 1 truyền thống.

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
