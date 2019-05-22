<template>
  <div class="qrcode-box"
    v-on:click.stop="click && click()"

  >
    <div
      class="order-qrcode"
      :style="{
        backgroundImage: `url('${qrcodeBase64}')`,
      }"
    ></div>
    <div class="qrcode-text" v-show="!!text">{{text}}</div>
  </div>
</template>
<script>
import QRCode from 'qrcode';

export default {
  props: ['click', 'text'],
  data() {
    return {
      qrcodeBase64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAEr0lEQVR4Xu2dy64bMQxDk///6BTobhwgpwTtieucbuWRJVKUPI+bPl+v1+vhv2MQeEroMVz+TURCz+JTQg/jU0Il9DQEDsvHGSqhhyFwWDoqVEIPQ+CwdFSohB6GwGHpqFAJPQyBw9JRoRJ6GAKHpVMr9Pl83goJvb4d4xnXk31MZrf8CGwJhff7EkolVNpV6GcAVagKvVZIOpNSgZJ/sqczsZ25s/OL/bXfFKWAxgEOh64WcJqJrf/Z+cX+JPQKmYSCgtIKoxbZAq5CgRFquQTg6H42YeSv3f/u/Egg00+5KYAtoK2i2/0lFEqMCmL2faiEDgjYcrNHn23B2nLLP93ZrWAlVEKpBrInRXcfGkhRWXaPB/m7Oz+K/+dOuQTI7FNze+iK4139pGh1BX9bQavzk9BhZq4GfLV/CZXQ7hi4W8uj+zyqeLqe7LP9k7+3mb96hqYBpYeS1D8V4Or9V/tffspNAV+ecPh2KC2ANN/Z/iU0/ASFniVLKCAwvYJV6GfE02N7WsHtjTkVRGpv46fr2w4wveVSwK2dTpmr7W38dL2Elh+RqdChxGy5pLnM/nWFZuG6ejUC9QxdHaD+MwQkNMNr+9USuj1FWYA1oekpcfZtBaXbxtf6X/0o883/6ofzLaB0fQv4av8SCu8z02M9EUb2tmAkVEKphj7a6xma7v5tRax+Nkx40IOYtANNn6GUwOyWkxZECiD5JzvhkcZD/iR0QODbp27qGBI6IJAqghRIdiIgjYf8TVdomiCtp4SpolP/pFACtL2e8qH9JTR83UaASujNgBLgZJfQ8qMrW273P5fV96E0s6jCiUBSEN23kX+Kj/ZPZ2CLF8UroYCQhIZ/WUEKIkBV6LUiVagK/YwAKa6dOXQ9zajUTjMr7SCED3UciqdWKD2rpQAogRSAlDAiJI0/3Z8KlPaf/mBBQq+3GRIa3rdSRaeAqtC0Byxen7bkNBwqkLRDUQHRCKL4p89Q2nC2XUIn37bMJij1J6ESGtXMz7VcUkiE3j8sphnTEkD+aWbSjKQU0/2n37ZI6PXXOCWUSnawUwWrUEIIAFehhyu0rI+38mkVRw8iqEGk+9/tb/kMldDPlM4uEAkt39e2BSuh5e8K2XJpCAx2qrj00ETH/tRO6aTx0/5UQIRH3QHu/vtQApgAS+20n4Sq0AsCqeLS9VSQtx+KKIG0RalQOEX/7y23fbaaFgi1aFJUez36l9DuE5L0ECOh5W3LbAW2hLTXq9DwNxsIcLIj4GGBkr+fPxQRIe0hbvZMl9DwK0JqyQQozdC0gMgfxVN/JJYGTAERwKm9VUwab7ufhIYzaXUBHk8oVTjZiYAWQNqfOkJ7favI2w9FlDDZJZQQutqXz9AsnPfVEpohKKGA18+33Kye8tUEMNnHHdP1dD3NdMq4nanTFUoBt3YigOxEyOoHC5S/hJa/e5QWABWECqWSHexEANmJkJ9XaMiHyxcjUM/QxfHpPkRAQkPAdl8uobszFMYnoSFguy+X0N0ZCuOT0BCw3ZdL6O4MhfFJaAjY7ssldHeGwvgkNARs9+USujtDYXwSGgK2+3IJ3Z2hMD4JDQHbfbmE7s5QGN8fV4a3DlWgdQoAAAAASUVORK5CYII=',
    };
  },
  async mounted() {
    //   qrcodeBase64
    // this.qrcodeBase64 =
    // await this.generateQrcode(`${window.location.protocol}//${window.location.host}`);
    this.qrcodeBase64 = await this.generateQrcode(window.location.href);
  },
  methods: {
    generateQrcode: async (value) => {
      try {
        const base64 = await QRCode.toDataURL(value, {
          errorCorrectionLevel: 'H',
          //   type: 'image/jpeg',
          width: 500,
          rendererOpts: {
            quality: 1,
          },
        });
        return base64;
      } catch (err) {
        return '';
      }
    },
  },
};
</script>
<style scoped>
.qrcode-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3999;
}
.order-qrcode {
  width: 6rem;
  height: 6rem;
  /* background-image: url("/img/remind.png"); */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  /* border-radius: 50%; */
}
.qrcode-text {
  margin-top: 0.6rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: black;
  background-color: #fff;
  /* height: .4rem; */
  padding: 0.1rem;
  border-radius: 0.2rem;
}
</style>
