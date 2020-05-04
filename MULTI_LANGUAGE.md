* install react-intl
```
npm install react-intl
```

* setup App redux stores for locale

* create Translations folder
index.js
```
import enMessages from './en.json';

const languageObject = {
    'en': enMessages,
    'zh-Hans-CN': {

    }
};
export default languageObject;
```

en.json
```
{
    "username": "Username",
    "password": "Password",
    "url": "URL",

    "username_is_required": "Username is required",
    "password_is_required": "Password is required",
    "url_is_required": "URL is required"
}
```

* setup react-intl at RootScreen.js
```
import { IntlProvider } from 'react-intl';
import languageObject from '../../Translations';
```

```
<IntlProvider locale={this.props.locale} messages={languageObject[this.props.locale]}>
    <Layout>
    </Layout>
</IntlProvider>
```

read the locale from redux storage
```
const mapStateToProps = (state) => ({
  locale: state.app.locale,
})
```

* When use in component, inject intl to the component
```
import { injectIntl } from 'react-intl';
```

```
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(LoginScreen))
```

```
const { intl } = this.props;

intl.formatMessage({id:'username'})
```