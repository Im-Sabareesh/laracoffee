// modal order detail
$("span.order-detail-link[title='order detail']").click(function (event) {
    setVisible("#loading", true);
    var id = $(this).attr("data-id");

    $.ajax({
        url: "/order/data/" + id,
        method: "get",
        dataType: "json",
        success: function (response) {
            const date = new Date(response["created_at"]).toLocaleDateString(
                "id-id",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }
            );

            $("#username_detail").html("@" + response["user"]["username"]);
            $("#order_date_detail").html(date);
            $("#quantiity_detail").html(response["quantity"]);
            $("#address_detail").html(response["address"]);
            $("#payment_method_detail").html(
                response["payment"]["payment_method"]
            );
            $("#status_detail").html(response["status"]["order_status"]);
            $("#style_status_detail")
                .removeClass()
                .addClass(
                    "spinner-grow spinner-grow-sm text-" +
                        response["status"]["style"]
                );
            $("#bank_detail").html(
                response["bank"] ? response["bank"]["bank_name"] : ""
            );
            $("#account_number_detail").html(
                response["bank"] ? response["bank"]["account_number"] : ""
            );
            $("#notes_transaction_detail").html(
                response["refusal_reason"]
                    ? response["refusal_reason"]
                    : response["note"]["order_notes"]
            );
            $("#total_price_detail").html(response["total_price"]);
            $("#transaction_doc_detail").attr(
                "src",
                "/storage/" + response["transaction_doc"]
            );
            $("#product_name_detail").html(response["product"]["product_name"]);
            $("#image_product_detail").attr(
                "src",
                "/storage/" + response["product"]["image"]
            );
            $("#link_bukti_transfer").attr("data-id", response["id"]);
            $("#form_cancel_order").attr(
                "action",
                "/order/cancel_order/" + response["id"]
            );

            // refusal reason form
            $("#form_reject_order").attr(
                "action",
                "/order/reject_order/" +
                    response["id"] +
                    "/" +
                    response["product_id"]
            );

            // approve order form
            $("#form_approve_order").attr(
                "action",
                "/order/approve_order/" +
                    response["id"] +
                    "/" +
                    response["product_id"]
            );

            if (response["coupon_used"] != null) {
                $("#content-kuponUsed").html(
                    `<span class="link-danger" style="cursor: pointer; ">` +
                        response["coupon_used"] +
                        ` kupon</span> digunakan untuk pemesanan ini`
                );
            } else {
                $("#content-kuponUsed").html(
                    `tidak ada kupon yang digunakan untuk pemesanan ini`
                );
            }

            // restrict fitur upload bukti untuk metode pembayaran COD
            if (response["payment"]["payment_method"] == "COD") {
                // menghilangkan element sesuai metode pembayaran
                $("#modal_section_payment_proof").css("display", "none");
                $("#row_bank").css("display", "none");
            } else {
                // untuk memunculkan kembali element yang dihilangkan
                $("#modal_section_payment_proof").css("display", "unset");
                $("#row_bank").css("display", "table-row");
            }

            if (response["status_id"] == 5) {
                $("#link_edit_order").css("display", "none");
                $("#form_cancel_order").css("display", "none");
                $("#message").css("display", "unset");
            } else {
                // untuk memunculkan kembali element yang dihilangkan
                $("#link_edit_order").css("display", "unset");
                $("#form_cancel_order").css("display", "unset");
                $("#message").css("display", "none");
            }

            $("#OrderDetailModal").modal("show");
            setVisible("#loading", false);
        },
    });
});

const setVisible = (elementOrSelector, visible) =>
    ((typeof elementOrSelector === "string"
        ? document.querySelector(elementOrSelector)
        : elementOrSelector
    ).style.display = visible ? "block" : "none");
