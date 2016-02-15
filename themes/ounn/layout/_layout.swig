<!doctype html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    {# #238, Disable Baidu tranformation #}
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />

    {% if theme.favicon %}
      <link rel="shortcut icon" type="image/x-icon" href="{{ url_for(theme.favicon) }}" />
    {% endif %}

    <title>{% block title %}{% endblock %}</title>
</head>

<body>


    <h1>{{ config.title }} favicon {{ theme.favicon }}</h1>

    <section>
    {% block content %}{% endblock %}
    </section>

    <footer>This is footer.</footer>
</body>
</html>
