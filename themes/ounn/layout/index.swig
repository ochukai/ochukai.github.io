{% extends '_layout.swig' %}

{% block title %} {{ config.title }} {% endblock %}

{% block content %}
    <a href="/index/index.html"> Index </a>
    <hr />

    {% for post in page.posts %}
        <p>
            <a class="post-title-link" href="{{ url_for(post.path) }}" itemprop="url">
            {{ post.title | default(__('post.untitled'))}}
            </a>
        </p>
        <p>
            <time datetime="{{ moment(post.date).format() }}"
                  content="{{ date(post.date, config.date_format) }}">
                {{ date(post.date, config.date_format) }}
            </time>
        </p>
        <p>
            <time datetime="{{ moment(post.updated).format() }}"
                  content="{{ date(post.updated, config.date_format + ' ' + config.time_format) }}">
                {{ date(post.updated, config.date_format + ' ' + config.time_format) }}
            </time>
        </p>
        <div class="post-tags">
            {% for tag in post.tags %}
            <a href="{{ url_for(tag.path) }}" rel="tag">#{{ tag.name }}</a>
            {% endfor %}
        </div>
          {% if post.categories and post.categories.length %}
            <span class="post-category" >
              {% for cat in post.categories %}
                <span itemscope >
                  <a href="{{ url_for(cat.path) }}" >
                    <span >{{ cat.name }}</span>
                  </a>
                </span>
              {% endfor %}
            </span>
          {% endif %}
    {% endfor %}
{% endblock %}

