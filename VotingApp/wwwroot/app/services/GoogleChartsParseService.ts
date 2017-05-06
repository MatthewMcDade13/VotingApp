module app.services
{
    import Poll = app.models.Poll;
    import Chart = app.models.Chart;
    import Vote = app.models.Vote;
    import ChartColumn = app.models.ChartColumn;
    import ChartRow = app.models.ChartRow;
    import ChartCell = app.models.ChartCell;

    export class GoogleChartsParseService
    {

        convertToChart(poll: Poll): Chart
        {
            let chart: Chart = <Chart>{ "cols": [], "rows": [] };

            chart.cols.push(<ChartColumn>{ "label": poll.name, "type": "string" });
            chart.cols.push(<ChartColumn>{ "label": "Vote Options", "type": "number" });

            for (let i = 0; i < poll.votes.length; i++)
            {
                chart.rows.push(<ChartRow>{
                    "c": [
                        <ChartCell>{ "v": poll.votes[i].name, "f": null },
                        <ChartCell>{ "v": poll.votes[i].voteCount, "f": null }
                    ]
                });
            }

            console.log(chart);

            return chart;
        }

        addRowToChart(chart: Chart, voteOption: Vote): void
        {
            chart.rows.push(<ChartRow>{
                "c": [
                    <ChartCell>{ "v": voteOption.name, "f": null },
                    <ChartCell>{ "v": `${voteOption.voteCount}`, "f": null }
                ]
            });
        }
    }

    angular.module("VotingApp").service("GoogleChartsParseService", GoogleChartsParseService);
}