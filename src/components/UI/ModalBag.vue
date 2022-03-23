<template>
  <div class="bag">
    <div class="container">
      <div class="row mx-auto bg-white rounded shadow">
        <div class="table-responsive">
          <table class="table bag__table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" class="col-1">#</th>
                <th scope="col" class="col-2">Currency</th>
                <th scope="col" class="col-3">Current price</th>
                <th scope="col" class="col-3">Currency gain</th>
                <th scope="col" class="col-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="col-1">1</th>
                <td class="col-2">BTC</td>
                <td class="col-3">$41414.14</td>
                <td class="col-3">+25%</td>
                <td class="col-3">
                  <div class="bag__trash-btn mx-auto"></div>
                </td>
              </tr>
              <tr>
                <th scope="row" class="col-3">2</th>
                <td class="col-3">RPX</td>
                <td class="col-3">$4.33</td>
                <td class="col-3">+12%</td>
                <td class="col-3">
                  <div class="bag__trash-btn mx-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props) {

  }
})
</script>
<style lang='scss' scoped>
.bag {
  background-color: rgba(31, 36, 33, 0.8);
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  min-height: 200px;
  // .bag__table

  &__table {
    td {
      vertical-align: middle;
    }
  }

  // .bag__trash-btn

  &__trash-btn {
    // position: absolute;
    // right: 0;
    width: 33px;
    height: 33px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url("@/assets/svg/trash.svg");
    background-color: rgba(0, 0, 0, 0.6);
    mask-size: contain;
    mask-position: center;
    transition: transform 0.3s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      background-color: rgba(0, 0, 0, 1);
    }
  }
}
</style>