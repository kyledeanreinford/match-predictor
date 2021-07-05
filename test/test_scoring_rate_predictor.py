from unittest import TestCase

from matchpredictor.evaluation.evaluator import Evaluator
from matchpredictor.matchresults.results_provider import load_results
from matchpredictor.predictors.scoring_rate_predictor import train_scoring_predictor


class TestScoringRatePredictor(TestCase):
    def test_accuracy_last_two_seasons(self):
        training_data = load_results('england-training.csv', result_filter=lambda result: result.fixture.season >= 2017)
        validation_data = load_results('england-validation.csv')
        predictor = train_scoring_predictor(training_data, 50)

        accuracy = Evaluator(predictor).measure_accuracy(validation_data)

        self.assertGreaterEqual(accuracy, .33)