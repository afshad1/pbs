<script>
import { Doughnut } from 'vue-chartjs'
import { getters, actions, mutations } from "@/pbsStore";

export default {
  extends: Doughnut,
  name: "PBSChart",
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index]
                if (label) {
                  label += ': ';
                }
                label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString("de-DE",{style:"currency", currency:"EUR"})
                return label;
              }
            }
        }
      },
    };
  },
  methods: {
    testMethod() {
      // console.log(this.pbsdata);
    },
    ...mutations
  },
  computed: {
    aktivaChartData() {
      const aktivaPbs = this.pbsDataFilter('cat', 'aktiva');
      const aktivaLabels = aktivaPbs.map((x) => x.name);
      const aktivaData = this.getChartValues('aktiva');
      const aktivaChartdata = {
        labels: aktivaLabels,
        datasets: [{
          label: 'Aktiva',
          data: aktivaData,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }],
      }
      return aktivaChartdata;
    },
    ...getters
  },
  created() {
    // fetching data from pbsStore at creation
    actions.fetchDataFromLocalStorage();
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style scoped>
</style>
