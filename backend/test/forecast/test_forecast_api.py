from unittest import TestCase

from matchpredictor.app import app


class TestForecastApi(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.test_client = app.test_client()

    def test_forecast(self) -> None:
        response = self.test_client.get('/forecast/england?home_team=Everton&away_team=Burnley"')

        self.assertEqual(response.get_json(), {
            'fixture': {
                'away_team': {'name': 'Burnley"'},
                'home_team': {'name': 'Everton'},
                'league': 'england',
                'tier': None
            },
            'outcome': 'home'})
