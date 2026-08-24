# So sánh Promise.all và Array.fromAsync

## Đặt Vấn Đề
Khi cần lấy dữ liệu chi tiết cho một danh sách các ID từ API, bạn sẽ phải xử lý nhiều request bất đồng bộ. Việc lựa chọn phương pháp xử lý sẽ quyết định cách thức các request này được gửi đi, từ đó ảnh hưởng đến hiệu suất của ứng dụng cũng như sức chịu tải của server.

## 1. Promise.all (Xử lý song song)

Promise.all nhận vào một mảng các Promise và bắt đầu thực thi tất cả chúng cùng một lúc.

### Ưu điểm
Thời gian thực thi rất nhanh do tất cả các request được thực hiện song song.

### Nhược điểm
Việc gửi hàng loạt request cùng lúc có thể gây ra hiện tượng spike traffic. Với những API có cơ chế rate limit, việc này dễ dàng dẫn đến việc máy chủ trả về lỗi 429 (Too Many Requests) hoặc làm sập hệ thống nếu tài nguyên xử lý không đủ.

## 2. Array.fromAsync (Xử lý tuần tự)
Array.fromAsync (JavaScript 2025) cung cấp cách thức gọn nhẹ để chuyển đổi một cấu trúc dữ liệu có thể duyệt thành một mảng bất đồng bộ. Nó xử lý từng phần tử một cách tuần tự.

### Ưu điểm
Giải quyết triệt để vấn đề spam server. Do phải đợi request trước hoàn thành rồi mới chạy request sau, lưu lượng mạng luôn giữ ở mức ổn định, ngăn ngừa được lỗi 429. Cú pháp lại ngắn gọn hơn so với việc dùng vòng lặp for...of truyền thống.

### Nhược điểm
Tổng thời gian chờ sẽ bằng tổng thời gian của tất cả các request cộng lại, khiến nó chậm hơn đáng kể so với xử lý song song.

## Phân tích kết quả chạy
* demoPromiseAll: Cả 3 dòng log bắt đầu sẽ in ra màn hình gần như cùng một thời điểm. Bộ đếm thời gian sẽ cho thấy tổng thời gian thực thi chỉ là khoảng 1 giây.
* demoArrayFromAsync: Dòng log đầu tiên hiện ra, sau đó hệ thống đợi 1 giây, rồi in dòng log thứ hai, và tiếp tục đợi 1 giây để in dòng log cuối. Bộ đếm thời gian sẽ báo cáo tổng thời gian thực thi là 3 giây.