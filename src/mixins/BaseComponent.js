import DomHelper from '@/libraries/DomHelper.js';

export default {
	data: () => ({
		mounted: false,
		baseStyle: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
	}),

	props: {
		size: {
			type: Object,
			default: () => ({}),
		},

		color: {
			type: [ String, Object ],
			default: 'transparent',
		},

		css: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		viewSize() {
			let size = {
				...this.finalSize,
			};

			if (this.css.width)
				size.width = parseFloat(this.css.width);

			if (this.css.height)
				size.height = parseFloat(this.css.height);

			return size;
		},

		finalSize() {
			if (this.size.width && this.size.height) {
				return {
					...this.size,
				};
			}

			if (!this.mounted)
				return undefined;

			let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

			return {
				width: this.size.width || parentSize.width,
				height: this.size.height || parentSize.height,
			};
		},

		sizeStyle() {
			if (!this.finalSize)
				return {};

			let size = {
				width: this.finalSize.width || '100%',
				height: this.finalSize.height || '100%',
			};

			if (/[0-9]$/.test(size.width))
				size.width += 'px';

			if (/[0-9]$/.test(size.height))
				size.height += 'px';

			return size;
		},
	},

	mounted() {
		this.mounted = true;
	},

	methods: {
		calcRatioSizes(origin, target) {
			if (origin.height / origin.width >= target.height / target.width) {
				origin.height = target.width * origin.height / origin.width;
				origin.width = target.width;
				origin.top = (target.height - origin.height) / 2;

			} else {
				origin.width = target.height * origin.width / origin.height;
				origin.height = target.height;
				origin.left = (target.width - origin.width) / 2;
			}
		},

		setCss(css) {
			this.baseStyle = {
				...this.baseStyle,
				...css,
			};
		},
	},
}