<template>
    <v-col cols="12" >
      <v-simple-table
        fixed-header
        :height="height"
      >
        <template v-slot:default>
          <thead v-if="screenBreakpoint">
            <tr>
              <th class="text-center">
                {{$t('cart.table.name')}}
              </th>
              <th class="text-center">
                {{$t('cart.table.price')}}
              </th>
              <th class="text-center">
                {{$t('cart.table.quantity')}}
              </th>
              <th class="text-center">
                {{$t('cart.table.option')}}
              </th>
              <th class="text-center">
                {{$t('cart.table.totalU')}}
              </th>
            </tr>
          </thead>
          <tbody v-if="screenBreakpoint">
            <tr
              v-for="(item, index) in cartDatas"
              :key="item.product.id"
              style="border: 2px blue solid"
            >
              <td class="text-center">{{ item.product.name }}</td>
              <td class="text-center">{{ priceUnit(item.product.price) }} {{ $t("index.currency") }}</td>
              <td class="text-center">
                <v-chip @click="updateQuantity(false, index)" elevation="2" small>-</v-chip>
                <span class="mx-2">{{item.quantity}}</span>
                <v-chip @click="updateQuantity(true, index)" elevation="2" small>+</v-chip>
              </td>
              <td class="text-center">
                <v-chip @click="removeItem(index)" elevation="2" x-small>X</v-chip>
              </td>
              <td class="text-center amountUnit">{{totalUnit(item.product.price, item.quantity)}} {{ $t("index.currency") }}</td>
            </tr>
          </tbody>
          <tbody 
            v-for="(item, index) in cartDatas" 
            v-else
            :key="item.product.id"
          >
            <tr>
              <td>{{$t('cart.table.name')}}</td>
              <td class="text-center">{{ item.product.name }}</td>
            </tr>
            <tr>
              <td>{{$t('cart.table.price')}}</td>
              <td class="text-center">{{ item.product.price }} {{ $t("index.currency") }}</td>
            </tr>
            <tr>
              <td>{{$t('cart.table.quantity')}}</td>
              <td class="text-center">
                <v-chip @click="updateQuantity(false, index)" elevation="2" small>-</v-chip>
                <span class="mx-2">{{item.quantity}}</span>
                <v-chip @click="updateQuantity(true, index)" elevation="2" small>+</v-chip>
              </td>
            </tr>
            <tr>
              <td>{{$t('cart.table.option')}}</td>
              <td class="text-center">
                <v-chip @click="removeItem(index)" elevation="2" x-small>X</v-chip>
              </td>
            </tr>
            <tr>
              <td>{{$t('cart.table.totalU')}}</td>
              <td class="text-center amountUnit">
                {{totalUnit(item.product.price, item.quantity)}} {{ $t("index.currency") }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="screenBreakpoint">
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th class="text-center">Totals</th>
                <td class="text-center">{{totalCart}} {{ $t("index.currency") }}</td>
            </tr>
          </tfoot>
          <tfoot v-else>
            <tr>
                <th class="text-center">Totals</th>
                <td class="text-center">{{totalCart}} {{ $t("index.currency") }}</td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-col>
</template>

<script>
    export default {
        data() {
            return {
                height: undefined
            }
        },
        props: {
            cartDatas: Array,
            totalCart: String,
            updateQuantity: Function,
            removeItem: Function
        },
        methods: {
            screenBreakpoint() {
                if (this.$vuetify.breakpoint.width > 600) {
                    this.height = '300px'
                    return true
                } else {
                    this.height = '600px'
                    return false
                }
            },
            priceUnit(el) {
                let length = el.length - 2;
                let centimes = el.slice(length);
                let amount = el.slice(0, length);
                return amount.concat(",", centimes);
            },
            totalUnit(price, quantity) {
                let el = (price * quantity).toString()
                let length = el.length - 2;
                let centimes = el.slice(length);
                let amount = el.slice(0, length);
                return amount.concat(",", centimes);
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>