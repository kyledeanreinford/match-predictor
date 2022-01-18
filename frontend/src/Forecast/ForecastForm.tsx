import {FormEvent, ReactElement, useState} from 'react';
import {NumberInput, TextInput} from '../Forms/Inputs';
import {Fixture, forecastState} from './ForecastState';
import {useDispatch} from 'react-redux';
import {forecastApi} from './ForecastApi';
import {result} from '../Http/Result';

const emptyFixture = {
    home: '',
    away: '',
    league: '',
    season: 2021
};

const ForecastForm = (): ReactElement => {
    const [fields, setFields] = useState<Fixture>(emptyFixture);
    const dispatch = useDispatch();

    const submit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(forecastState.startLoading);
        const fixture = {
            home: fields.home,
            away: fields.away,
            league: fields.league,
            season: fields.season,
        };

        forecastApi.fetchFor(fixture)
            .then(forecast => {
                setFields(emptyFixture);
                dispatch(forecastState.finishedLoading(result.ok(forecast)));
            })
            .catch(message => {
                return dispatch(forecastState.finishedLoading(result.err(message)));
            });
    };

    return <article>
        <form onSubmit={submit}>
            <fieldset>
                <TextInput
                    label="Home"
                    value={fields.home}
                    required
                    onChange={home => setFields({...fields, home})}
                />
                <span className="versus">vs.</span>
                <TextInput
                    label="Away"
                    value={fields.away}
                    required
                    onChange={away => setFields({...fields, away})}
                />
            </fieldset>
            <fieldset>
                <TextInput
                    label="League"
                    value={fields.league}
                    required
                    onChange={league => setFields({...fields, league})}
                />
                <NumberInput
                    label="Season"
                    value={fields.season || ''}
                    required
                    onChange={season => setFields({...fields, season})}
                />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    </article>;
};

export default ForecastForm;