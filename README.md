# Tasuku Rest API
> Tasuku is todo list app. Tasks are synced on multiple devices using rest API.

## API URL
http://35.204.63.61:3001/api/tasks

## Available Requests
###### All tasks
> GET http://35.204.63.61:3001/api/tasks/ 

###### Add new {title, description, status}
> POST http://35.204.63.61:3001/api/tasks/

###### Single task
> GET http://35.204.63.61:3001/api/tasks/{TaskID}

###### Update task {title, description, status}
> PUT http://35.204.63.61:3001/api/tasks/{TaskID}

###### Delete task
> DELETE http://35.204.63.61:3001/api/tasks/{TaskID}

## Release History

* 0.9
        
## Todo
- [x] MongoDB
- [ ] Soft Delete


## Meta

Temo Jr. Tchanu – [@Tchanu](https://linkedin.com/in/tchanu/) – Tchanukvadze@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/Tchanu](https://github.com/Tchanu)

## Contributing

1. Fork it (<https://github.com/Tchanu/Tasuku-server/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
