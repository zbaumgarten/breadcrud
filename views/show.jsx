const React = require('react')
const Default = require('./layouts/default')

//ternary operator
function Show({ bread }) {
    const bakedBy = bread.bakedBy()
    return (
        <Default>
            <h2>Show Page</h2>
            <h3>{bread.name}</h3>
            <p>
                and it { bread.hasGluten ? <span>does </span> : <span>does NOT </span> }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name} />
            <p>{bakedBy}</p>
            <a href={`/breads/${bread._id}/edit`}>Edit</a>
            <form method='POST' action={`/breads/$${bread._id}?_method=DELETE`}>
                <input type="submit" value="DELETE" />
            </form>
        </Default>
    )
}

module.exports = Show