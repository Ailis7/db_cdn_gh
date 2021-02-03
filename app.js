document.addEventListener("DOMContentLoaded", function () {
	new Vue({
		el: "#dashboard",
		data: {
			loading: false,
			comissions: [
				{
					label: "Сегодня",
					value: 1098754,
				},
				{
					label: "Вчера",
					value: 257272,
				},
				{
					label: "Неделю назад",
					value: 1402503,
				},
				{
					label: "Год назад",
					value: 2974769,
				},
			],
			sdelki: [
				{
					value: 70,
					avg_cheque: "",
				},
				{
					value: 2,
					avg_cheque: "",
				},
			],
			rest: [
				{
					value: 2,
				},
				{
					value: 10,
				},
			],
		},
		methods: {
			arrowPrev: function arrowPrev() {
				$(".carousel").carousel("prev");
			},
			arrowNext: function arrowNext() {
				$(".carousel").carousel("next");
			},
			change: function change(swipe) {
				arrayItem = document.querySelectorAll(".carousel-item");
				this.currentComponent = arrayItem[swipe].firstChild;
				this.changeResize();
			},
			changeResize: function changeResize() {
				const header = this.currentComponent.querySelector("header");
				const section = this.currentComponent.querySelectorAll("section");
				if (section.length > 2) {
					const main = this.currentComponent.querySelector("main");
					this.resizeCount(this.currentComponent, header, main);
					return;
				}
				this.resizeCount(this.currentComponent, header, section[0], section[1]);
			},
			resizeCount: function resizeCount(
				mainContainer,
				headerContainer,
				bodyContainer,
				secondBodyContainer
			) {
				
					_this = this;

				if (mainContainer.clientWidth === 0) {
					setTimeout(function () {
						_this.resizeCount(
							mainContainer,
							headerContainer,
							bodyContainer,
							secondBodyContainer
						);
					}, 500);
					return;
				}
				mainContainer.style.height = "100vh";

				var countHeight = function countHeight() {
					var body = bodyContainer.clientHeight;

					if (
						(mainContainer.clientWidth < 767) &
						(secondBodyContainer !== undefined)
					) {
						body += secondBodyContainer.clientHeight;
					}

					return (headerContainer.clientHeight + body) / 0.98;
				};

				var firstCountHeight = countHeight();
				var browserHeight = document.documentElement.clientHeight;
				this.sumHeight =
					firstCountHeight > browserHeight ? firstCountHeight + "px" : "100vh";

				mainContainer.style.height = this.sumHeight;
				var secondCountHeight = countHeight();

				if (secondCountHeight > firstCountHeight) {
					mainContainer.style.height = secondCountHeight + "px";
				} else {
					mainContainer.style.height = this.sumHeight;
				}
			},
		},
		created: function created() {
			window.addEventListener("resize", this.changeResize);
		},
		beforeDestroy: function beforeDestroy() {
			window.removeEventListener("resize", this.changeResize);
		},
		computed: {
			comissionsWithoutFirst: function comissionsWithoutFirst() {
				var _this2 = this;

				return this.comissions.filter(function (e) {
					return _this2.comissions.indexOf(e) > 0;
				});
			},
		},
		mounted: function mounted() {
			const _this3 = this;
			this.currentComponent = this.$refs.FirstGarantee;
			this.changeResize();
			$("#carousel").on("slide.bs.carousel", function (event) {
				_this3.change(event.to);
			});

			// обращение к api писать тут
			this.comissions[0].value = 10000;
			this.loading = true;
		},
	});
});
