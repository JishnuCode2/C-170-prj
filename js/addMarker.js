AFRAME.registerComponent("add-markers", {
    init: async function(){
        var scene = document.querySelector("#scene");

        var items = await this.getItems();

        items.map(item =>{
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", item.id);
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", item.marker_pattern_url);
            marker.setAttribute("marker-handler", {});
            marker.setAttribute("cursor", {rayOrigin: "mouse"});
            scene.appendChild(marker);

            var model = document.createElement("a-entity");
            model.setAttribute("id",`model-${item.id}`);
            model.setAttribute("position", item.model_geometry.position);
            model.setAttribute("rotation", item.model_geometry.rotation);
            model.setAttribute("scale", item.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${item.model_url})`);
            model.setAttribute("gesture-handler", {});
            marker.appendChild(model);

            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id", `main-plane-${item.id}`);
            mainPlane.setAttribute("position", {x:1,y:0,z:0});
            mainPlane.setAttribute("width", 1.8);
            mainPlane.setAttribute("height", 1.5);
            mainPlane.setAttribute("rotation", {x:-90, y:0, z:0});
            mainPlane.setAttribute("color", "orange");
            marker.appendChild(mainPlane)

            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id", `title-plane-${item.id}`);
            titlePlane.setAttribute("position", {x:0, y:0.89, z:0.02});
            titlePlane.setAttribute("width", 1.89);
            titlePlane.setAttribute("height", 0.3);
            titlePlane.setAttribute("rotation","0 0 0");
            titlePlane.setAttribute("color","#ff0000");
            mainPlane.appendChild(titlePlane);

            var titleText = document.createElement("a-entity");
            titleText.setAttribute("id", `title-text-${item.id}`);
            titleText.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            titleText.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            titleText.setAttribute("text", {
              font: "monoid",
              color: "black",
              width: 1.8,
              height: 1,
              align: "center",
              value: item.toy_name.toUpperCase()
            });
            titlePlane.appendChild(titleText);

            var desc = document.createElement("a-entity");
            desc.setAttribute("id", `text-${item.id}`);
            desc.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            desc.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            desc.setAttribute("text",{
                font: "monoid",
                color: "black",
                width: 1.5,
                height: 1,
                align: "center",
                value: item.description.join("\n")  
            })
            mainPlane.appendChild(desc)
 
        })

    },

    getItems: async function(){
        return await firebase.firestore()
        .collection("toys")
        .get()
        .then(snap =>{
          return snap.docs.map(doc => doc.data());
        })
    }
})